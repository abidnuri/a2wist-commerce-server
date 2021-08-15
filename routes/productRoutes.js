const router = require('express').Router()
const { addProduct, getAllProduct, myProducts, updateProduct } = require('../controllers/productController')


router.route('/addProduct').post(addProduct)
router.route('/allProducts').get(getAllProduct)
router.route('/myProducts').get(myProducts)
router.route('/update/:id').patch(updateProduct)

module.exports = router;