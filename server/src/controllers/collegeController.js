const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

// ==========================Create College APi===============================
const college = async function (req, res) {
  try {
    const data = req.body;
    const collegeData = await collegeModel.create(data);
    return res.status(201).send({ status: true, data: collegeData });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// =================================Get-CollegeDetails Api=============================

const getcollegeDetails = async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    let collegeName = req.query.collegeName;
    if (Object.keys(req.query).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please apply filter" });
    if (!collegeName) {
      return res
        .status(400)
        .send({ status: false, message: "college name is required" });
    }
    const college = await collegeModel.findOne({
      name: collegeName,
      isDeleted: false,
    });
    if (!college)
      return res
        .status(400)
        .send({ status: false, message: "No college found" });

    const interData = await internModel.find({
      collegeId: college._id,
      isDeleted: false,
    });

    // Mapping the internData to extract required fields
    const interns = interData.map((intern) => {
      return {
        _id: intern._id,
        name: intern.name,
        email: intern.email,
        mobile: intern.mobile,
      };
    });

    // Creating collegeDetails object with extracted data
    const collegeDetails = {
      name: college.name,
      fullName: college.fullName,
      logoLink: college.logoLink,
      interns: interns,
    };
    // Sending the collegeDetails as response
    res.status(200).send({ status: true, data: collegeDetails });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Destructuring
module.exports = { college, getcollegeDetails };
