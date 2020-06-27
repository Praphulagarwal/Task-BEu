const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    noOfOrders: {
        type: Number,
        default :0
    },
});

module.exports = mongoose.model('User', userSchema);