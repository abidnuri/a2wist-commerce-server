const mongoose = require('mongoose')

const order = new mongoose.Schema({
    title: String,
    price: Number,
    id: String,
    quantity: Number,
})

const orderSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: [true],
    },
    customerEmail: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    shopID: {
        type: String,
        required: true
    },
    products: [order],
    orderDate: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ['PENDING', 'CANCELLED', 'ONGOING', 'FULFILLED' ],
        default: 'PENDING'
    }
})

module.exports = mongoose.model('Order', orderSchema)