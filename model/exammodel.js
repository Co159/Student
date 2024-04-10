const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  examName: {
    type: String,
  },
  examDate: {
    type: Date,
    default: Date.now,
  },
});

const exammodel = mongoose.model("exams", examSchema);
module.exports = exammodel;
