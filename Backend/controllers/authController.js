const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

const JWT_SECRET = "your_secret_key"; // Replace with env variable in production

// Register Teacher
exports.registerTeacher = async (req, res) => {
    console.log("Incoming request body:", req.body); 
  const { name, email, password, subjects } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = new Teacher({ name, email, password: hashedPassword, subjects });
    await teacher.save();

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering teacher", error });
  }
};



exports.loginTeacher = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email exists
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ message: "Invalid Email" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: teacher._id, role: "teacher" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
