const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['CLIENT', 'ADMIN'],
            message: '{VALUE} is not supported'
        },
        default: 'CLIENT'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    }]
});

userSchema.methods.addToCart = function (product) {
    const productIndex = this.cart.findIndex(p => {
        return p.productId.toString() === product._id.toString();
    });
    if (productIndex === -1) {
        const updatedCart = [...this.cart];
        updatedCart.push({ productId: product._id });
        this.cart = updatedCart;
        return this.save();
    }
}

userSchema.methods.deleteFromCart = function (productId) {
    const updatedCart = this.cart.filter(p => {
        return p.productId.toString() !== productId.toString();
    });
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.clearCart = function () {
    this.cart = [];
    return this.save();
}

module.exports = mongoose.model('User', userSchema);