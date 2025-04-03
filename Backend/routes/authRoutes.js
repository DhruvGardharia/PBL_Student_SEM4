const express = require("express");
const { registerTeacher, loginTeacher } = require("../controllers/authController");
const authTeacher = require("../middleware/authTeacher");
const { markAttendance } = require("../controllers/attendanceController");

// Protected route - only accessible by authenticated teachers

const router = express.Router();
router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.post("/mark", authTeacher, markAttendance);
module.exports = router;
