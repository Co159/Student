const express = require("express");

const { createExam } = require("../api/examapi");
const { getExam } = require("../api/examapi");
const { updateExam } = require("../api/examapi");



const examRoutes = express.Router();

examRoutes.post("/create",createExam);
examRoutes.get("/list",getExam);
examRoutes.put("/update",updateExam);



module.exports = { examRoutes };