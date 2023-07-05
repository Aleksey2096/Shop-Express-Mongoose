const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
        product: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Order', orderSchema);