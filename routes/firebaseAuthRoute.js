const express = require("express");
const router = express.Router();

const { createOrUpdateUser } = require("../controllers/firebaseAuthController");

router.get("/create-or-update-user", createOrUpdateUser);

module.exports = router;
