const express = require("express");
const router = express.Router();

//middleware
const {authCheck} = require("../middlewares/firebaseAuth")

//controller
const { createOrUpdateUser, currentUser } = require("../controllers/firebaseAuthController");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);

module.exports = router;
