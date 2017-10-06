const assert = require('assert');
const mongoose = require('mongoose');
const Expense = require('../src/expense');
const dbName = process.env.dbName || 'mongodb://localhost/test';

describe('Expense', () => {
    describe('#get', () => {
        it('should return return a list of all expenses', () => {

        });
    });
    describe('#create', () => {
        it('should create a new expense record', (done) => {
            mongoose.connect(dbName);
            let db = mongoose.connection;
            db.on('error', console.error);
            db.once('open', () => {
                const expense = new Expense({
                    category: 0,
                    label: 'Testing',
                    value: 1,
                });

                expense.save((err, exp) => {
                    if (err) done(err);
                    db.close();
                    done()
                    console.dir(expense);
                });
            });
        });
    });
    describe('#update', () => {
        it('should update an existing expense record', () => {

        });
    });
    describe('#delete', () => {
        it('should delete an existing expense record', () => {

        });
    });
});