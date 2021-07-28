const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Mongodb connetion
const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o8ccw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB connected succesfully");
  })
  .catch((err) => console.log("Error : ", err));

// Routes
const authRouter = require("./routes/authRoutes");

app.use("/auth", authRouter);

app.get("/ping", (req, res) => {
  res.send("Server is running");
});

app.listen(3333, console.log("server is running"));
