let mongoose = require('mongoose');

const expenseCategories = {
    MISC: 0
};

let expenseSchema = new mongoose.Schema({
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
    },
    active: {
        type: Boolean,
        default: true,
        required: true
    }
});

let Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
