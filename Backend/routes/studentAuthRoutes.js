const express = require("express");
const { registerStudent, loginStudent } = require("../controllers/studentAuthController");
const { getStudentAttendance } = require("../controllers/getStudentAttendance");
const authStudent = require("../middleware/authStudent"); 
const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/attendance", authStudent, getStudentAttendance); 
module.exports = router;
