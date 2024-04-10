const joi = require("joi");

const schema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  rollNo: joi.number().min(5),
  classid: joi.string(),
  subjectid: joi.string(),
});

module.exports = {
  schema,
};
