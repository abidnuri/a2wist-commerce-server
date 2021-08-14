const router = require('express').Router()
const { addProduct, getAllProduct, myProducts } = require('../controllers/productController')


router.route('/addProduct').post(addProduct)
router.route('/allProducts').get(getAllProduct)
router.route('/myProducts').get(myProducts)

module.exports = router;