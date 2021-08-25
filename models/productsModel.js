const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        text: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        text: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000,
        text: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    // category: {
    //     type: ObjectId,
    //     ref: 'Category',
    // },
    // subs: {
    //     type: ObjectId,
    //     ref: 'Sub',
    // },
    quantity: Number,
    sold: {
        type: Number,
        default: 0,
    },
    images: {
        type: Array,
    },
    shipping: {
        type: String,
        enum: ['Yes', 'No']
    },
    color: {
        type: String,
        enum: ["Black", "White", "Red", "Yellow", "Blue", "Green",]
    },
    // brand: {
    //     type: String,
    //     enum: ["Apple", "Samsung", "Microsoft",]
    // },
    // ratings: [{
    //     star: Number,
    //     postedBy: {
    //         type: ObjectId, ref: "FireUser",
    //     },
    // }],
}, { timestamps: true }
);

module.exports = mongoose.model("Products", productsSchema);