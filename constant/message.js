const responseMessage = {
  studentData: {
    AddStudent: "student added successfully",
    GetStudent: "student get successfully",
    UpdateStudent: "student update successfully",
    DeleteStudent: "student delete successfully",
    StudentExists: ` `,
    StudentNotFound: ` `,
  },
  classData: {
    AddClass: "class added successfully",
    GetClass: "class get successfully",
    UpdateClass: "class update successfully",
    DeleteClass: "class delete successfully",
  },
  subjectData: {
    AddSubject: "subject added successfully",
    GetSubject: "subject get successfully",
    UpdateSubject: "subject update successfully",
    DeleteClass: "subject delete successfully",
  },
  examData: {
    AddExam: "exam added successfully.",
    GetExam: "exam get successfully",
    UpdateExam: "exam update successfully",
    DeleteExam: "exam delete successfully",
  },
  error: {
    Error: "something went wrong",
  },
  status: {
    success: "success",
  },
};

const response = {
  responseMessage,
};

module.exports = response;
