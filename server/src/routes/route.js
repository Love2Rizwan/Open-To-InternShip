const express = require('express');
const router = express.Router();

// require the controllers and validation modules
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController");
const validation = require("../validation/validation");

// define routes
router.post("/functionup/colleges", validation.collegeValidation, collegeController.college);
router.post("/functionup/interns", validation.internValidation, internController.createIntern);
router.get("/functionup/collegeDetails", collegeController.getcollegeDetails);

// handle invalid requests
router.all("/*", function (req, res) {
  res.status(400).send("Invalid request........!!!");
});

module.exports = router;
