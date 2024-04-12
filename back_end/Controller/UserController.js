const { PDFDocument } = require("pdf-lib");
const ejs = require("ejs");
const { user, userCreateJoi, userUpdateJoi } = require("../Models/UserModel");
let pdf = require("html-pdf");
const path = require("path");
const nodemailer = require("nodemailer");

// const createUser=(req,res)=>{
//     try{
//         const {error,value}=userCreateJoi.validate(req.body)
//         if(error){
//             console.log(error)
//             res.send({message:"Error In Validating The Event Data...Enter Correct Data."})
//         }
//         else{
//             let Data=new user(value)

//             Data.save()
//             .then(()=>{
//                 res.send({message:"User Registered Successfully."})
//             })
//             .catch((err)=>{
//                 console.log(err)
//                 res.send({message:"Error Occur In Register User..."})
//             })
//         }
//     }
//     catch{
//         res.send({message:"Server Error"})
//     }
// }

const readUser = (req, res) => {
  try {
    user
      .find({ isDeleted: false })
      .populate("EventId")
      .then((resp) => {
        if (!resp) {
          res.send({ message: "There Is No Such User..." });
        } else {
          res.send(resp);
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "An Error Occur..." });
      });
  } catch {
    res.send({ message: "Server Error" });
  }
};

const updateUser = (req, res) => {
  try {
    const { error, value } = userUpdateJoi.validate(req.body);
    if (error) {
      console.log(error);
      res.send({ message: "Enter Correct Data..." });
    } else {
      user
        .findOne({ UserName: req.query.UserName, isDeleted: false })
        .then((resp) => {
          if (resp) {
            user
              .updateOne(resp, value)
              .then(() => {
                res.send({ message: "User Updated Successfully..." });
              })
              .catch((err) => {
                console.log(err);
                res.send({ message: "Error In Updating User." });
              });
          } else {
            res.send({ message: "There Is No Such User" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.send({ message: "No Such User Found..." });
        });
    }
  } catch {
    res.send({ message: "Server Error" });
  }
};

const deleteUser = (req, res) => {
  try {
    user
      .findOne({ UserName: req.query.UserName })
      .then((resp) => {
        if (resp) {
          user
            .updateOne(resp, { isDeleted: true })
            .then(() => {
              res.send({ message: "User Deleted Successfully..." });
            })
            .catch((err) => {
              console.log(err);
              res.send({ message: "Error In Deleting User." });
            });
        } else {
          res.send({ message: "There Is No Such User" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.send({ message: "No Such User Found..." });
      });
  } catch {
    res.send({ message: "Server Error" });
  }
};

const createBulkUser = (req, res) => {
  let users = req.body.data;
  let eventId = req.body.EventId;
  let ErrorFlag = false;
  let errorFind;

  // users.map((value) => {
  //   const { error } = userCreateJoi.validate(value);
  //   if (error) {
  //     ErrorFlag = true;
  //     errorFind = error;
  //   }
  // });
  if (ErrorFlag) {
    res.send({ isSuccess: false, error: errorFind });
  } else {
    let eventIdArray = eventId.split("");
    let passEventId = eventIdArray.slice(0, 2).join("");
    let arr = [];
    users.map((val) => {
      let userNameArray = val[0].split("");
      let passUserName = userNameArray.slice(0, 2).join("");
      let passDate = new Date().getDate();
      let passMonth = new Date().getMonth();
      let passYear = new Date().getFullYear();
      let passmilliseconds = new Date().getMilliseconds();

      let CertificateId =
        passEventId +
        passUserName +
        passDate +
        passMonth +
        passYear +
        passmilliseconds;

      arr.push(
        new user({
          UserName: val[0],
          UserEmail: val[1],
          Score: val[2],
          CertificateId: CertificateId,
          EventId: eventId,
        })
      );
    });
    console.log("arr---", arr);
    user
      .insertMany(arr)
      .then((response) => {
        console.log("response", response);
        res.send({ isSuccess: true });
      })
      .catch((err) => {
        console.log("err---", err);
      });
  }
};
// http://localhost:5000/user/downloadCertificate?CertificateId=66He3122024557

const downloadCertificate = (req, res) => {
  let certiId = req.query.CertificateId;
  // CertificateId: certiId
  user
    .find({ CertificateId: certiId })
    .populate("EventId")
    .then((resp) => {
      let userName = resp[0].UserName;
      let score = resp[0].Score;
      let certificateId = resp[0].CertificateId;
      let { EventName, CreationDate } = resp[0].EventId.toObject();

      res.render("index", {
        userName: userName,
        score: score,
        certificateId: certificateId,
        eventName: EventName,
        creationDate: CreationDate,
      });
    })
    .catch((err) => {
      console.log(err);
      res.send({ isSuccess: false, message: "No Such User Found..." });
    });
};

const emailCertificates = (req, res) => {
  try {
    let eventId = req.query.EventId;
    console.log("eventId***", eventId)
    user
      .find({ EventId: eventId })
      .then((resp) => {
        console.log(resp);
        resp.map(async (val) => {
          await handleEmail(val.CertificateId, val.UserEmail);
        });
        res.send({isSuccess : true})
      })
      .catch((err) => {
        console.log(errs);
      });
  } catch (err) {
    console.log(err);
    res.send({ isSuccess: false, message: "No Such User Found..." });
  }
};

const handleEmail = (CertificateId, UserEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "marketing.technishal@gmail.com",
      pass: "wfon cyzu lpnp zdxt",
    },
  });
  // Setup email data
  const mailOptions = {
    from: "marketing.technishal@gmail.com",
    to: UserEmail,
    subject: "Certificate",
    text: `Hello, Find your Certificate at http://localhost:5000/user/downloadCertificate?CertificateId=${CertificateId}`,
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  emailCertificates,
  readUser,
  updateUser,
  deleteUser,
  createBulkUser,
  downloadCertificate,
};
