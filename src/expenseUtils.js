const mongoose = require('mongoose');
const Expense = require('./expense');

const dbName = process.env.dbName || 'mongodb://localhost/test';

module.exports = {
    addExpenseDocument: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            const writestream = gfs.createWriteStream({
                filename: req.files.file.name,
                mode: 'w',
                content_type: req.files.file.mimetype,
                metadata: req.body,
            });
            fs.createReadStream(req.files.file.path).pipe(writestream);

            writestream.on('close', (file) => {
                res.send("Success!");
                fs.unlink(req.files.file.path, (err) => {
                    if (err) console.error("Error: " + err);
                    console.log('successfully deleted : ' + req.files.file.path);
                });
            });
        });
    },
    addExpense: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            const expense = new Expense({
                category: req.body.category,
                label: req.body.label,
                value: req.body.value,
            });

            expense.save((err, exp) => {
                if (err) return console.error(err);
                db.close();
                res.sendStatus(200);
                console.dir(expense);
            });
        });
    },

    updateExpense: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            Expense.findOneAndUpdate({
                _id: req.body._id
            }, req.body,
                {
                    upsert: true
                }, function(err, doc) {
                    if (err) return res.send(500, {
                            error: err
                        });
                    db.close();
                    return res.send("succesfully saved");
                });
        });
    },

    deleteExpense: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            Expense.findOneAndUpdate({
                _id: req.body._id
            }, {
                active: false
            },
                {
                    upsert: true
                }, function(err, doc) {
                    if (err) return res.send(500, {
                            error: err
                        });
                    db.close();
                    return res.send("succesfully deleted");
                });
        });
    },

    getExpenses: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            Expense.find({
                active: true
            }, (err, results) => {
                console.log('Results', err, results);
                if (err) return console.error(err);
                db.close();
                res.status(200).send(results);
                console.dir(results);
            });
        });
    },

    getInactiveExpenses: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            Expense.find({
                active: false
            }, (err, results) => {
                console.log('Results', err, results);
                if (err) return console.error(err);
                db.close();
                res.status(200).send(results);
                console.dir(results);
            });
        });
    },

    getExpense: (req, res) => {
        mongoose.connect(dbName);
        let db = mongoose.connection;
        db.on('error', console.error);
        db.once('open', () => {
            Expense.find({
                '_id': req.params.expenseId,
                active: true
            }, (err, results) => {
                if (err) return console.error(err);
                db.close();
                res.status(200).send(results);
                console.dir(results);
            });
        });
    }
};