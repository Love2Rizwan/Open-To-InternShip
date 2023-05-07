const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const mongoose = require("mongoose");

// =============================Create Intern Api==============================

// Controller function to create an intern
const createIntern = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const internData = req.body;

    // Find the college by name
    const clgName = internData.collegeName;
    const clgData = await collegeModel.findOne({ name: clgName, isDeleted: false });

    // If college not found, return an error response
    if (!clgData) {
      return res.status(404).send({ status: false, message: "collegeName not found" });
    }

    // Set the collegeId in internData
    internData.collegeId = clgData._id;

    // Create a new intern with internData
    const savedInternData = await internModel.create(internData);

    // Return a success response with the saved intern data
    return res.status(201).send({ status: true, data: savedInternData });
  } catch (err) {
    // Return an error response if an exception occurs
    return res.status(500).send({ status: false, message: err.message });
  }
};

// Export the createIntern controller function
module.exports.createIntern = createIntern;
