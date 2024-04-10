const mongoose = require("mongoose");


const classSchema = new mongoose.Schema({
  divName: {
    type: String,
  },
  teacher: {
    type: String,
  },
});

const classmodel = mongoose.model("classes", classSchema);
module.exports = classmodel;


//created subject,exam collectin
//subject id given student
//exam id given subject
