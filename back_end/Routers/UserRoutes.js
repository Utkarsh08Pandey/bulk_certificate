const express = require("express");
const {
  readUser,
  updateUser,
  deleteUser,
  createBulkUser,
  downloadCertificate,
  emailCertificates,
} = require("../Controller/UserController");

let router = express.Router();

// router.post("/createUser",createUser)
router.post("/createBulkUser", createBulkUser);
router.get("/readUser", readUser);
router.put("/updateUser", updateUser);
router.put("/deleteUser", deleteUser);
router.get("/downloadCertificate", downloadCertificate);
router.get("/emailCertificates", emailCertificates);

// emailCertificates

module.exports = router;
