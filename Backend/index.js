const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;

// MongoDB Connection
require("./config/database").connect();

// ✅ CORS Setup (Allow only deployed frontend)
const allowedOrigins = [
  'https://pbl-student-sem4-15.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request from origin:", origin);
    if (!origin || allowedOrigins[0].includes(origin)) {
      callback(null, true);
    } else {
      console.error("Blocked by CORS:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// ✅ Apply CORS Middleware at top
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ✅ General Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ API Routes
const authRoutes = require("./routes/authRoutes");
const studentAuthRoutes = require("./routes/studentAuthRoutes");
const ocrRoutes = require("./routes/ocrRoute");
const geminiTranscribeRoute = require("./routes/geminiTranscribeRoute");
const attendenceRoute = require("./routes/attendenceRoute");
const headCountRoute = require("./routes/headCountRoute");

app.use("/api/auth", authRoutes);            // Teacher authentication
app.use("/api/student", studentAuthRoutes);  // Student login/register
app.use("/api/ocr", ocrRoutes);              // OCR operations
app.use("/api", geminiTranscribeRoute);      
app.use("/api", headCountRoute);             
// app.use("/api/attendance", attendenceRoute); // Optional Attendance route

// ✅ Serve static frontend build
app.use(express.static(path.join(__dirname, "client", "react-tailwind-css-starter-pack", "build")));

// ✅ Serve React's index.html for unmatched routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "react-tailwind-css-starter-pack", "build", "index.html"));
});

// ✅ Health Check
app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(allowedOrigins[0]);
});
