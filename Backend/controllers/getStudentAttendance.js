const Student = require("../models/Student"); // Adjust path as needed


exports.getStudentAttendance = async (req, res) => {
    const roll_no = req.student.roll_no; // Extract student roll number from token
    const { date } = req.body; // Student provides the date

    console.log("Extracted Roll Number:", roll_no); 
    try {
        // Find the student using the roll number
        const student = await Student.findOne({ roll_no });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Filter attendance records for the given date
        const attendanceRecords = student.attendance.filter(record => record.date === date);

        if (attendanceRecords.length === 0) {
            return res.status(404).json({ message: "No attendance record found for this date" });
        }

        res.status(200).json({ roll_no, date, attendance: attendanceRecords });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving attendance", error : error.toString()});
    }
};
