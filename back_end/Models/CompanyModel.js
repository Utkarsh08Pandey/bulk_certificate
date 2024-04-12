const mongoose=require('mongoose')
const joi=require('joi')

let companySchema=mongoose.Schema({
    CompanyName:String,
    Password:String,
    Email:String,
    PhoneNo:String,
    Address:String,
    GST:String,
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const loginschema=joi.object({
    CompanyName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')).required(),
    Password:joi.string().required(),
    Email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    PhoneNo:joi.string().length(10).regex(/^\d+$/).required(),
    Address:joi.string().required(),
    GST:joi.string()
})

const editschema=joi.object({
    CompanyName:joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{1,30}$')),
    Password:joi.string(),
    Email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    PhoneNo:joi.string().length(10).regex(/^\d+$/),
    Address:joi.string(),
    GST:joi.string().length(15)
})

let company=mongoose.model('Company',companySchema)

module.exports={company,loginschema,editschema}