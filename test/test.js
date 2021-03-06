const assert = require('assert');
const mongoose = require('mongoose');
const Expense = require('../src/expense');
const dbName = process.env.dbName || 'mongodb://localhost/test';

const newExpense = {
    category: 0,
    label: 'Testing',
    value: 1,
};

const existingExpense = {
    _id: "59ad644dbcd3513fe670aa6a",
    value: Math.random()
};

const cleanupCreated = (expense) => {
    mongoose.connect(dbName);
    let db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', () => {
        Expense.deleteOne({
            _id: expense._id
        }, (err, results) => {
            if (err) console.error(err);
            console.log('Success!');
            db.close();
        });
    });
};

describe('Expense', () => {
    describe('#get', () => {
        it('should return return a list of all expenses', (done) => {
            mongoose.connect(dbName);
            let db = mongoose.connection;
            db.on('error', console.error);
            db.once('open', () => {
                Expense.find({}, (err, results) => {
                    if (err) done(err);
                    db.close();
                    done();
                });
            });
        });
    });
    describe('#create', () => {
        it('should create a new expense record', (done) => {
            mongoose.connect(dbName);
            let db = mongoose.connection;
            db.on('error', console.error);
            db.once('open', () => {
                const expense = new Expense(newExpense);

                expense.save((err, exp) => {
                    if (err) done(err);
                    db.close();
                    done();
                    cleanupCreated(exp);
                });
            });
        });
    });
    describe('#update', () => {
        it('should update an existing expense record', (done) => {
            mongoose.connect(dbName);
            let db = mongoose.connection;
            db.on('error', console.error);
            db.once('open', () => {
                Expense.findOneAndUpdate({
                    _id: existingExpense._id
                }, existingExpense,
                    {
                        upsert: true
                    }, function(err, doc) {
                        if (err) done(err);
                        db.close();
                        done();
                    });
            });
        });
    });
    describe('#delete', () => {
        it('should delete an existing expense record', (done) => {
            mongoose.connect(dbName);
            let db = mongoose.connection;
            db.on('error', console.error);
            db.once('open', () => {
                Expense.findOneAndUpdate({
                    _id: "59ad644dbcd3513fe670aa6a"
                }, {
                    active: false
                },
                    {
                        upsert: true
                    }, function(err, doc) {
                        db.close();
                        if (err) done(err);
                        done();
                    });
            });
        });
    });
});