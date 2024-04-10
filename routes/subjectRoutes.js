const express = require("express");
const { createSubject } = require("../api/subjectapi");
const { getSubject } = require("../api/subjectapi");
const { updateSubject } = require("../api/subjectapi");


const subjectRoutes = express.Router();

subjectRoutes.post("/create", createSubject);
subjectRoutes.get("/list", getSubject);
subjectRoutes.put("/update", updateSubject);


module.exports = { subjectRoutes };
