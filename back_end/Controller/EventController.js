const {event,createEventJoi,updateEventJoi}=require('../Models/EventModel')

const createEvent=(req,res)=>{
    try{
        const {error,value}=createEventJoi.validate(req.body)
        if(error){
            console.log(error)
            res.send({message:"Error In Validating The Event Data...Enter Correct Data."})
        }
        else{
            let Data=new event(value)

            Data.save()
            .then((resp)=>{
                let Id=resp._id
                res.send({isSuccess: true, message:"Event Registered Successfully.",Id})
            })
            .catch((err)=>{
                console.log(err)
                res.send({message:"Error Occur In Register Event..."})
            })
        }
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const readEvent=(req,res)=>{
    try{
        console.log("here")
        event.find({isDeleted: false})
        .then((resp)=>{
            console.log("data", resp)
            res.send({isSuccess: true, data: resp})
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"An Error Occur..."})
        })
    }
    catch(err){
        console.log("err", err)
        res.send({message:"Server Error"})
    }
}

const updateEvent=(req,res)=>{
    try{
        const {error,value}=updateEventJoi.validate(req.body)
        if(error){
            console.log(error)
            res.send({message:"Enter Correct Data..."})
        }
        else{
            event.findOne({EventName:req.query.EventName,isDeleted:false})
            .then((resp)=>{
                if(resp){
                    event.updateOne(resp,value)
                    .then(()=>{
                        res.send({message:"Event Details Updated Successfully..."})
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.send({message:"Error In Updating Event."})
                    })
                }
                else{
                    res.send({message:"There Is No Such Event..."})
                }
            })
            .catch((err)=>{
                console.log(err)
                res.send({message:"No Such Event Found..."})
            })
        }
    }
    catch{
        res.send({message:"Server Error"})
    }
}

const deleteEvent=(req,res)=>{
    try{
        event.findOne({EventName:req.query.EventName})
        .then((resp)=>{
            if(resp){
                event.updateOne(resp,{isDeleted:true})
                .then(()=>{
                    res.send({message:"Event Deleted Successfully..."})
                })
                .catch((err)=>{
                    console.log(err)
                    res.send({message:"Error In Deleting Event..."})
                })
            }
            else{
                res.send({message:"There Is No Such Event."})
            }
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"No Such Event Found..."})
        })
    }
    catch{
        res.send({message:"Server Error"})
    }
}
module.exports={createEvent,readEvent,updateEvent,deleteEvent}