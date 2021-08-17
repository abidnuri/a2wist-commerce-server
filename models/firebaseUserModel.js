const mongoose = require('mongoose');
const { objectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    role: {
        type: String,
        default: "subscriber"
    },
    cart: {
        type: array,
        default: [],
    },
    address: String,

},
    { timestamps: true },
);

module.export = mongoose.model('FireUser', userSchema);