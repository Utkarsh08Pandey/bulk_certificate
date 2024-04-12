#!bin/bash

ACCOUNT_NUMBER=''
REGION=''
ACCESS_KEY_ID=''
SECRET_ACCESS_KEY_ID=''

# Dynamodb Table 
TABLE_NAME="AppTable"

aws dynamodb describe-table --table-name "$TABLE_NAME" >/dev/null 2>&1

if [[ $? -ne 0 ]]; then
    aws dynamodb create-table \
        --table-name $TABLE_NAME \
        --attribute-definitions AttributeName=<attribute-name>,AttributeType=<attribute-type> \
        --key-schema AttributeName=<attribute-name>,KeyType=<key-type> \
        --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=10
fi

# Check if the Lambda function exists
aws lambda get-function \
  --function-name "$FUNCTION_NAME" \
  --region "$REGION" \
  >/dev/null 2>&1

# Set the function name, role, and region
FUNCTION_NAME="my-lambda-function"
ROLE_ARN="arn:aws:iam::123456789012:role/my-lambda-role"

if [[ $? -ne 0 ]]; then
    echo "Lambda function $FUNCTION_NAME not exists."

    # Create the Lambda function
    FUNCTION_ARN=$(aws lambda create-function \
    --function-name "$FUNCTION_NAME" \
    --runtime "nodejs14.x" \
    --role "$ROLE_ARN" \
    --handler "index.handler" \
    --code "S3Bucket=my-bucket,S3Key=lambda_function.zip" \
    --region "$REGION" \
    --output text \
    --query 'FunctionArn'
    )

    echo "Lambda function created with ARN: $FUNCTION_ARN"

    # Create the API Gateway REST API
    API_ID=$(aws apigatewayv2 create-api \
    --name "my-api" \
    --protocol-type "HTTP" \
    --region "$REGION" \
    --output text \
    --query 'ApiId'
    )

    echo "API Gateway created with ID: $API_ID"

    # Create the API Gateway integration
    INTEGRATION_ID=$(aws apigatewayv2 create-integration \
    --api-id "$API_ID" \
    --integration-type "AWS_PROXY" \
    --integration-uri "arn:aws:apigateway:$REGION:lambda:path/2015-03-31/functions/$FUNCTION_ARN/invocations" \
    --integration-method "POST" \
    --region "$REGION" \
    --output text \
    --query 'IntegrationId'
    )

    echo "API Gateway integration created with ID: $INTEGRATION_ID"

    # Create the API Gateway route
    ROUTE_ID=$(aws apigatewayv2 create-route \
    --api-id "$API_ID" \
    --route-key "POST /my-endpoint" \
    --target "integrations/$INTEGRATION_ID" \
    --region "$REGION" \
    --output text \
    --query 'RouteId'
    )

    echo "API Gateway route created with ID: $ROUTE_ID"

    # Deploy the API Gateway
    DEPLOYMENT_ID=$(aws apigatewayv2 create-deployment \
    --api-id "$API_ID" \
    --region "$REGION" \
    --output text \
    --query 'DeploymentId'
    )

    echo "API Gateway deployed with ID: $DEPLOYMENT_ID"



