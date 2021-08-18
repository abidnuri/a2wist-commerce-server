const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/AppError')

exports.addOrder = asyncHandler(async(req, res, next) => {
    const order = await Order.create(req.body)

    if(order){
        res.status(201).json({status: 'success', message: 'Order successfully submitted'})
    }
})