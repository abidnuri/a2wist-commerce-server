const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// Mongodb connetion
const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o8ccw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const newUrl = `mongodb+srv://eswap:${process.env.DB_PASS}@cluster0.znd2u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// Mongoose
mongoose
  .connect(newUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log("DB connected succesfully");
  })
  .catch((err) => console.log("Error : ", err));

// import route
const authRouter = require("./routes/authRoutes");
const productRouter = require('./routes/productRoutes')

// app.use("/auth", authRouter);
app.use('/product', productRouter)

app.get("/ping", (req, res) => {
  res.send("Server is running");
});


// Unknown route handling
app.all('*', (req, res, next) => {
  const err = new Error(`Can't find the "${req.originalUrl}" in the server.`)
  err.statusCode = 404
  err.status = 'fail'
  next(err)
})

// Global Error handling Middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
})

app.listen(process.env.PORT || 3333, console.log("server is running"));
