// const router = require("express").Router();
const express = require("express");
const router = express.Router();

const { login, registerUser } = require("../controllers/authController");

// router.route("/login").post(login);
// router.route("/register").post(registerUser);

router.get("/create-or-update-user", (req, res) => {
res.json({
    data: 'love'
})
})

module.exports = router;




