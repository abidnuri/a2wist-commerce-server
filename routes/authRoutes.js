const router = require("express").Router();

const { login, registerUser } = require("../controllers/authController");

router.route("/login").post(login);
router.route("/register").post(registerUser);

module.exports = router;
