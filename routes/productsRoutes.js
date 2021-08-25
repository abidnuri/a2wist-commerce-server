const express = require('express');
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require('../middlewares/firebaseAuth');

// controller
const { create, read } = require('../controllers/productsController');

// routes
router.post("/allproducts", authCheck, adminCheck, create);
router.get("/getallproducts", read);

module.exports = router;