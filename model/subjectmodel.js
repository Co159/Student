const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subjectName: {
    type: String,
  },
  subjectCode: {
    type: Number,
  },
  examId: {
    type:[mongoose.Types.ObjectId],
    ref:'exams'
  }
});

const subjectmodel = mongoose.model("subjects", subjectSchema);
module.exports = subjectmodel;
