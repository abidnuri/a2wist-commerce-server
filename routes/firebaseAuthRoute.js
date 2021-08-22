const express = require("express");
const router = express.Router();

//middleware
const { authCheck, adminCheck } = require("../middlewares/firebaseAuth")

//controller
const { createOrUpdateUser, currentUser } = require("../controllers/firebaseAuthController");

router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
// checking admin
router.post("/current-admin", authCheck, adminCheck, currentUser);


module.exports = router;
