import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import EventsDetailsForm from "./EventDetailsForm";
import CandidateDataForm from "./CandidateDataForm";
import axios from "axios";

const steps = [
  "Event Details",
  "Enter Candidate Details",
  "Disburse Certificates",
];

export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [eventData, setEventData] = React.useState({});
  const [studentData, setStudentData] = React.useState([]);
  const [eventId, setEventId] = React.useState("");

  const handleNext = async () => {
    if (activeStep === 2) {
      props.goToEventListingPage();
    } else {
      let response;
      if (activeStep === 0) {
        response = await axios.post(
          "http://localhost:5000/event/createEvent",
          eventData
        );
        setEventId(response.data.Id);
        console.log("response", response);
      } else if (activeStep === 1) {
        response = await axios.post(
          "http://localhost:5000/user/createBulkUser",
          { data: studentData, EventId: eventId }
        );
        console.log("response", response);
      }
      if (response.data.isSuccess) {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleEventData = (event) => {
    console.log("---", {
      ...eventData,
      [event.target.name]: event.target.value,
    });
    setEventData({ ...eventData, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ width: "95%", padding: "1%", margin: "1%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <div style={{ margin: "1%" }}>
            {activeStep === 0 && (
              <EventsDetailsForm handleEventData={handleEventData} />
            )}
            {activeStep === 1 && (
              <CandidateDataForm
                setStudentData={(dArr) => {
                  setStudentData(dArr);
                }}
              />
            )}
            {activeStep === 2 && <FormThree eventId={eventId} />}
          </div>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

function FormThree({ eventId }) {
  return (
    <div style={{ padding: "1%" }}>
      <>
        <Button
          variant="contained"
          style={{ margin: "1%" }}
          onClick={() => {
            // http://localhost:5000/user/emailCertificates?EventId=661906131029446959cd4ba4
            axios.get(
              `http://localhost:5000/user/emailCertificates?EventId=${eventId}`
            ).then((res)=>{
              console.log("res---", res)
              alert("Email Sent")
            }).catch((err)=>{
              console.log(err)
            });
          }}
        >
          Email Certificates
        </Button>
        <Button
          variant="contained"
          style={{ margin: "1%" }}
          onClick={() => {
            alert("Development under process");
          }}
        >
          Download all Certificates
        </Button>
      </>
    </div>
  );
}
