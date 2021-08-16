const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product Title is required.']
    },
    regularPrice: {
        type: Number,
        required: [true, 'Product Price is required']
    },
    stock: {
        type: Number,
        required: [true, 'Product Stock is required']
    },
    description: {
        type: String,
        required: [true, 'Please say something about your product.']
    },
    image: {
        type: String,
        required: [true, 'Upload an image of your product']
    },
    shopID: {
        type: String,
        required: [true, 'Shop ID is required.']
    }
})

module.exports = mongoose.model('Product', productSchema)