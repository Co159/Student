const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required:true
  },
  lastName: {
    type: String,
    // required:true
  },
  rollNo: {
    type: Number,
    // required:true,
    // unique:true,
    // minlength:3,
    // maxlength:5
  },
  classid: {
    type: mongoose.Types.ObjectId,
    ref:'classes'
  },
  subjectid: {
    type: [mongoose.Types.ObjectId],
    ref:'subjects'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const studentmodel = mongoose.model("students", studentSchema);
module.exports = studentmodel;
