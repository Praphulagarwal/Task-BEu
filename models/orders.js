const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subtotal: { 
        type: Number,
         required: true
    },
    date: {
        type: Date, 
        default: Date.now() 
    }
})

module.exports = mongoose.model('Order', orderSchema);