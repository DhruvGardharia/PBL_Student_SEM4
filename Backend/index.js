const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const studentAuthRoutes = require("./routes/studentAuthRoutes");
require('dotenv').config();
const PORT = process.env.PORT || 4000;

//cookie-parser - what is this and why we need this ?

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

app.use(express.json());

require("./config/database").connect();

app.use("/api/auth", authRoutes); // Teacher authentication
app.use("/api/student", studentAuthRoutes); 
//activate

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})