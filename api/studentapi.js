const express = require("express");
const server = express();
const student = require("../model/studentmodel");
const classmod = require("../model/classmodel");
const { responseMessage } = require("../constant/message");
const { studentData, classData, error, status } = responseMessage;
const { schema } = require("../validation/student_validation");
server.use(express.json());

const createUSer = async (req, res) => {
  try {
    const { firstName, lastName, rollNo, classid, subjectid } = req.body;

    const result = await schema.validateAsync(req.body);

    const existingStudent = await student.findOne({
      firstName: firstName,
      lastName: lastName,
      rollNo: rollNo,
    });
    if (existingStudent) {
      return res.status(400).json({
        status: status.error,
        message: `${studentData.StudentExists} ${firstName} ${lastName} ${rollNo} already exists in the database.`,
      });
    } else {
      let data = new student(req.body);
      let result = await data.save();
      if (result) {
        return res.status(200).json({
          status: status.success,
          message: studentData.AddStudent,
          data: req.body,
        });
      } else {
        return res.status(500).json({
          status: status.success,
          message: error.Error,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//filter method use , use map also
const getUser = async (req, res) => {
  const { firstName, lastName, rollNo, classid, subjectid, subjectName } =
    req.query;
  try {
    let query = { isDeleted: false };
    if (firstName) query.firstName = firstName;
    if (lastName) query.lastName = lastName;

    let data = await student
      .find(query)
      .populate({ path: "classid", match: { _id: classid } }) // Filtering by classid
      .populate({
        path: "subjectid",
        match: { _id: subjectid }, // Filtering by subjectid and subjectName
        select: "_id subjectName subjectCode",
        populate: {
          path: "examId",
        },
      });

    if (!data || data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `${firstName} ${lastName} data not found or deleted`,
      });
    }

    if (rollNo) {
      data = data.filter((x) => x.rollNo == rollNo);
    }

    if (subjectName) {
      data = data.filter((x) => x.subjectid.subjectName == subjectName);
    }

    const count = data.length;

    return res.status(200).json({
      status: "success",
      message: "Student Data Retrieved",
      data: { count, data },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

// const getUser = async (req, res) => {
//   const { firstName, lastName } = req.query;
//   try {
//     let data;
//     let count;

//     if (firstName || lastName) {
//       data = await student
//         .findOne({
//           firstName: firstName,
//           lastName: lastName,
//           isDeleted: false,
//         })
//         // .populate("classid")
//         .populate({ path: "classid" })
//         .populate({ path: "subjectid" });

//       count = await student.countDocuments(data);

//       if (!data) {
//         return res.status(404).json({
//           status: status.error,
//           message: `${firstName} ${lastName} data not found or deleted`,
//         });
//       }
//     } else {
//       data = await student
//         .find({ isDeleted: false })
//         .populate({ path: "classid" })
//         .populate({
//           path: "subjectid",
//           select: "_id subjectName subjectCode",
//           populate: {
//             path: "examId",
//           },
//         });
//       count = await student.countDocuments(data);
//     }
//     return res.status(200).json({
//       status: status.success,
//       message: studentData.GetStudent,
//       data: { count, data },
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const updateUser = async (req, res) => {
  const { _id, firstName, lastName, rollNo, classid } = req.body;
  try {
    const existingStudent = await student.findOne({
      _id: _id,
      isDeleted: false,
    });
    if (!existingStudent) {
      return res.status(404).json({
        status: status.error,
        message: ` ${_id} data deleted`,
      });
    } else {
      let updatedData = await student.updateOne(
        { _id: _id, isDeleted: false },
        {
          $set: {
            firstName: firstName,
            lastName: lastName,
            rollNo: rollNo,
            classid: classid,
          },
        }
      );
      if (updatedData) {
        return res.status(200).json({
          status: status.success,
          message: studentData.UpdateStudent,
          data: updatedData,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params._id;
  try {
    const existingStudent = await student.findOne({
      _id: _id,
      isDeleted: false,
    });
    if (!existingStudent) {
      return res.status(404).json({
        status: status.error,
        message: ` ${_id} data deleted already`,
      });
    } else {
      let data = await student.updateOne({ _id: _id }, { isDeleted: true });
      if (data) {
        return res.status(200).json({
          status: status.success,
          message: studentData.DeleteStudent,
          data: data,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { createUSer, getUser, updateUser, deleteUser };
