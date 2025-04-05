
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

exports.markAttendance = async (req, res) => {
    const { subject, date, time, present_students } = req.body;

    if (!req.teacher) {
        return res.status(403).json({ message: "Unauthorized access" });
    }

    const teacherId = req.teacher.id; // Extracted from middleware

    try {
        // Find the teacher
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Get all students
        const students = await Student.find();

        for (let student of students) {
            // **Check if this student already has attendance recorded for the same date and time**
            const alreadyMarked = student.attendance.some(
                (entry) => entry.date === date && entry.time === time
            );

            if (alreadyMarked) {
                return res.status(400).json({
                    message: `Attendance for roll number ${student.roll_no} has already been marked for ${date} at ${time}.`,
                });
            }

            // Determine attendance status
            const status = present_students.includes(student.roll_no) ? "Present" : "Absent";

            // Store attendance in student's record
            student.attendance = student.attendance || [];
            student.attendance.push({ subject, date, time, status, markedBy: teacherId });
            await student.save();
        }

        // **Store attendance in the Teacher model as well**
        teacher.attendance = teacher.attendance || [];
        teacher.attendance.push({ subject, date, time, present_students });
        await teacher.save();

        res.status(200).json({ message: "Attendance recorded successfully", present_students });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ message: "Error marking attendance", error });
    }
};
