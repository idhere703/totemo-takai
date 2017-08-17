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
    }
};