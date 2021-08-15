const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "Email is already exists with another id."],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email.."],
  },
  phone: {
    type: String,
    require: [true, "Please enter your phone number."],
  },
  image: {
    type: String,
    require: [true, "Please upload a image"],
  },
  role: {
    type: String,
    enum: ["CUSTOMER", "SELLER"],
    default: "CUSTOMER",
  },
  password: {
    type: String,
    require: [true, "Please enter a strong password."],
    minlength: 8,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
});
// Password Encrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model.User || mongoose.model("User", userSchema);
