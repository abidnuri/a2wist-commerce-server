const router = require("express").Router();

const { login, registerUser } = require("../controllers/authController");

router
  .route("/test")
  .get((req, res) => res.send("<h1>Auth route is working..</h1>"));
router.route("/login").post(login);
router.route("/register").post(registerUser);

module.exports = router;
