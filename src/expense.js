let mongoose = require('mongoose');
let expenseSchema = new mongoose.Schema({
    expenseId: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    value: {
        type: Number,
        required: true
    }
});

let Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
