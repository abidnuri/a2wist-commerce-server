const mongoose = require('mongoose')

const order = new mongoose.Schema({
    name: String,
    price: Number,
    id: String,
    shopId: String,
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
        type: string,
        require: true,
    },
    products: [order],
    orderDate: Date.now()
})

module.exports = mongoose.model('Order', orderSchema)