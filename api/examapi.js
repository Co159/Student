const express = require("express");
const server = express();
const exam = require("../model/exammodel");
const { responseMessage } = require("../constant/message");
const { examData, error, status } = responseMessage;

server.use(express.json());

const createExam = async (req, res) => {
  try {
    let data = new exam(req.body);
    let result = await data.save();
    if (result) {
      return res.status(200).json({
        status: status.success,
        message: examData.AddExam,
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

const getExam = async (req, res) => {
  try {
    const { examName } = req.query;
    console.log("examName", examName);

    let data;

    if (examName) {
      data = await exam.findOne({ examName: examName });
    } else {
      data = await exam.find();
    }

    const count = await exam.countDocuments(data);

    if (data) {
      return res.status(200).json({
        status: status.success,
        message: examData.GetExam,
        data: { count, data },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateExam = async (req, res) => {
  try {
    const { _id, examName, examCode } = req.body;
    let updateData = await exam.updateOne(
      { _id: _id },
      { $set: { examName: examName, examCode: examCode } }
    );
    if (updateData) {
      return res.status(200).json({
        status: status.success,
        message: examData.UpdateExam,
        data: updateData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createExam, getExam, updateExam };
