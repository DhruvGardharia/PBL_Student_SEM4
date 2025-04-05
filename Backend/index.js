// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes");
// const studentAuthRoutes = require("./routes/studentAuthRoutes");
// require('dotenv').config();
// const PORT = process.env.PORT || 4000;
// const cors = require('cors');
// const path = require('path');
// const { spawn } = require('child_process');
// const fs = require('fs');
// const bodyParser = require('body-parser'); // Make sure body-parser is imported

// app.use(cors());
// app.use(express.json()); // Use built-in express body parser

// require("./config/database").connect();

// app.use("/api/auth", authRoutes); // Teacher authentication
// app.use("/api/student", studentAuthRoutes);

// // Replace with your actual Gemini API key (consider using environment variables)
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_DEFAULT_GEMINI_API_KEY"; // Use environment variable if set

// app.post('/api/extract_roll_numbers', async (req, res) => {
//     const { imagePath } = req.body;

//     if (!imagePath) {
//         return res.status(400).json({ error: 'Image path not provided in the request body' });
//     }

//     const pythonScriptPath = path.join(__dirname, 'models', 'ocr.py'); // Adjust path if needed

//     // Execute the Python script
//     const pythonProcess = spawn('python', [pythonScriptPath, imagePath, GEMINI_API_KEY]);

//     let stdoutData = '';
//     let stderrData = '';

//     pythonProcess.stdout.on('data', (data) => {
//         stdoutData += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//         stderrData += data.toString();
//     });

//     pythonProcess.on('close', (code) => {
//         if (code === 0) {
//             try {
//                 const result = JSON.parse(stdoutData);
//                 res.json(result);
//             } catch (error) {
//                 console.error('Error parsing Python output:', error);
//                 console.error('Python Output:', stdoutData);
//                 res.status(500).json({ error: 'Error processing Python script output' });
//             }
//         } else {
//             console.error('Python script execution failed with code:', code);
//             console.error('Python Error Output:', stderrData);
//             res.status(500).json({ error: 'Python script failed to extract roll numbers' });
//         }
//     });
// });

// //activate
// app.listen(PORT, () => {
//     console.log(`App is listening at ${PORT}`);
// })
// 


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

// Routes
const authRoutes = require("./routes/authRoutes");
const studentAuthRoutes = require("./routes/studentAuthRoutes");
const ocrRoutes = require("./routes/ocrRoute");

// Connect to MongoDB
require("./config/database").connect();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files (e.g. attendance images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
  });
// API Routes
app.use("/api/auth", authRoutes);              // Teacher authentication
app.use("/api/student", studentAuthRoutes);    // Student auth and attendance view
app.use("/api/ocr", ocrRoutes);                // OCR image upload and processing

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
