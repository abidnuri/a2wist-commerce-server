const express = require('express');
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require('../middlewares/firebaseAuth');

// controller
const { create } = require('../controllers/productsController');

// routes
router.post("/allproducts", authCheck, adminCheck, create);

module.exports = router;