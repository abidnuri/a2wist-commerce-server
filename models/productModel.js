const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'Product Title is required.']
    },
    regularPrice: {
        type: Number,
        require: [true, 'Product Price is required']
    },
    stock: {
        type: Number,
        require: [true, 'Product Stock is required']
    },
    description: {
        type: String,
        require: [true, 'Please say something about your product.']
    },
    image: {
        type: String,
        require: [true, 'Upload an image of your product']
    },
    shopID: {
        type: String,
        require: [true, 'Shop ID is required.']
    },
    category: {
        type: String,
        enum: ['TECH', 'CLOTH', 'BOOK', 'GADGET', 'FURNITURE', 'OTHER'],
        require: [true, 'Please select your product category']
    }
})

module.exports = mongoose.model('Product', productSchema)