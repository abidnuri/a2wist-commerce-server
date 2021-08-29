const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");
require("dotenv").config();
const AppError = require('./utils/AppError')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

// Middleware
app.use(cors({
  // origin : "http://localhost:3000/",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(morgan("dev"));


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
const productRouter = require('./routes/productRoutes');




//firebase auth
const firebaseAuthRoute = require('./routes/firebaseAuthRoute');

//products router
const productsRouter = require('./routes/productsRoutes');
//cloudinary routes
const cloudinary = require('./routes/cloudinary');

app.use("/auth", authRouter);
app.use('/product', productRouter);

app.use('/fireauth', firebaseAuthRoute);
//products router
app.use('/products', productsRouter);

//cloudinary use
app.use('/cloudinary', cloudinary);

// app.use('/')
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')

app.use("/auth", authRouter);
app.use('/product', productRouter)
app.use('/order', orderRouter)

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
