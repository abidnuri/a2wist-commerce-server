const Order = require('../models/orderModel')
const asyncHandler = require('express-async-handler')
const AppError = require('../utils/AppError')
const decodeToken = require('../utils/decodeToken')

exports.addOrder = asyncHandler(async(req, res, next) => {
    const order = await Order.create(req.body)

    if(order){
        res.status(201).json({status: 'success', message: 'Order successfully submitted'})
    }
})

exports.getOrders = asyncHandler(async(req,res,next) => {
    const user = await decodeToken(req.cookies.token)

    const orders = await Order.find({shopID: user.shopID})
    if(orders){
        res.status(200).json({status: 'success', result: orders.length, data: orders})
    }
})

exports.updateOrder = asyncHandler(async(req,res,next) => {
    const user = await decodeToken(req.cookies.token)
    const order = await Order.find({_id: req.params.id})

    if(user.shopID === order.shopID){
        const updated = await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json({status: 'success', data: updated})
    }
})