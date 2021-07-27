const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
const authRouter = require("./routes/authRoutes");

app.use("/auth", authRouter);

app.get("/ping", (req, res) => {
  res.send("Server is running");
});

app.listen(3333, console.log("server is running"));
