const { addOrder } = require('../controllers/orderController')

const router = require('express').Router()

router.route('/test').get((req, res) => res.send({status: 'testing', message: 'route working'}))
router.route('/addOrder').post(addOrder)

module.exports = router