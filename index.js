const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const AppError = require('./utils/AppError')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

// Middleware
app.use(cors());
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
const productRouter = require('./routes/productRoutes')

app.use("/auth", authRouter);
app.use('/product', productRouter)

app.get("/ping", (req, res) => {
  res.send("Server is running");
});


// Unknown route handling
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find the "${req.originalUrl}" in the server.`, 404))
})

// Global Error handling Middleware
app.use(globalErrorHandler)

app.listen(process.env.PORT || 3333, console.log("server is running"));
