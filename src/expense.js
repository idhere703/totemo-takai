let mongoose = require('mongoose');

const expenseCategories = {
    MISC: 0
};

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
    },
    label: {
        type: String,
        default: 'Expense'
    },
    category: {
        type: String,
        default: expenseCategories.MISC
    }
});

let Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
