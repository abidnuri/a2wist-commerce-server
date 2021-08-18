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
        require: [true],
    },
    customerEmail: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    shopID: {
        type: String,
        require: true
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