const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true
    },
    occurrence: {
        type: String,
        required: true,
        default: "Entrada"
    },
    category: {
        type: String,
        required: true
    },
    observation: {
        type: String
    },
    inclusion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);