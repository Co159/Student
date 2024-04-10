const express = require("express");
const server = express();
const classmod = require("../model/classmodel");
const { responseMessage } = require("../constant/message");
const { studentdata, classData, error, status } = responseMessage;
server.use(express.json());

const createClass = async (req, res) => {
  try {
    let data = new classmod(req.body);
    let result = await data.save();
    if (result) {
      return res.status(200).json({
        status: status.success,
        message: classData.AddClass,
        data: req.body,
      });
    } else {
      return res.status(500).json({
        status: status.success,
        message: error.Error,
      });
    }
  } catch (error) {
    throw error;
  }
};

const getClass = async (req, res) => {
  try {
    const { teacher } = req.query;
    console.log("teacher", teacher);

    let data;

    if (teacher) {
      data = await classmod.findOne({ teacher: teacher });
    } else {
      data = await classmod.find();
    }

    const count = await classmod.countDocuments(data);
    if (data) {
      return res.status(200).json({
        status: status.success,
        message: classData.GetClass,
        data: { count, data },
      });
    }
    res.send({ count, data });
    console.log("Count:", count);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateClass = async (req, res) => {
  try {
    const { _id, className, teacher } = req.body;
    let updatedData = await classmod.updateOne(
      { _id: _id },
      { $set: { className: className, teacher: teacher } }
    );
    if (updatedData) {
      return res.status(200).json({
        status: status.success,
        message: classData.UpdateClass,
        data: updatedData,
      });
    }
    // res.send(updatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteClass = async (req, res) => {
  const _id = req.params._id;
  try {
    let data = await classmod.deleteOne({ _id: _id });
    if (data) {
      return res.status(200).json({
        status: status.success,
        message: classData.DeleteClass,
        data: data,
      });
    }
    // console.log(data);
    // res.send("done");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { createClass, getClass, updateClass, deleteClass };
