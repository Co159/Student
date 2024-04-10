const express = require("express");
const server = express();
const subject = require("../model/subjectmodel");
const { responseMessage } = require("../constant/message");
const { studentdata, classData, subjectData, error, status } = responseMessage;
server.use(express.json());

const createSubject = async (req, res) => {
  try {
    let data = new subject(req.body);
    let result = await data.save();
    if (result) {
      return res.status(200).json({
        status: status.success,
        message: subjectData.AddSubject,
        data: req.body,
      });
    } else {
      return res.status(500).json({
        status: status.success,
        message: error.Error,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getSubject = async (req, res) => {
  try {
    const { subjectName } = req.query;
    console.log("subjectName", subjectName);

    let data;

    if (subjectName) {
      data = await subject.findOne({ subjectName: subjectName }).populate('examId');
    } else {
      data = await subject.find().populate('examId');
    }

    const count = await subject.countDocuments(data);
    if (data) {
      return res.status(200).json({
        status: status.success,
        message: subjectData.GetSubject,
        data: { count, data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateSubject = async (req, res) => {
  try {
    const { _id, subjectName, subjectCode } = req.body;
    let updatedData = await subject.updateOne(
      { _id: _id },
      { $set: { subjectName: subjectName, subjectCode: subjectCode } }
    );
    if (updatedData) {
      return res.status(200).json({
        status: status.success,
        message: subjectData.UpdateSubject,
        data: updatedData,
      });
    }
  } catch (erro) {
    console.log(error);
    res.status(500).send("internal server error");
  }
};

module.exports = { createSubject, getSubject, updateSubject };
