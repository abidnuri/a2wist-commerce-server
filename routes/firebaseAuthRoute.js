const express = require("express");
const router = express.Router();

//middleware
const {authCheck} = require("../middlewares/firebaseAuth")

//controller
const { createOrUpdateUser } = require("../controllers/firebaseAuthController");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
