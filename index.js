let express = require('express');
let app = express();
let expenseUtils = require('./src/expenseUtils');
let bodyParser = require('body-parser');
let gfs = require('gridfs-stream');
let port = process.env.PORT ? process.env.PORT : 8100;
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/isUp', (req, res) => {
  res.send('Running');
});

app.get('/expenses', (req, res) => {
  expenseUtils.getExpenses(req, res);
});

app.get('/expenses/inactive', (req, res) => {
  expenseUtils.getInactiveExpenses(req, res);
})

app.post('/expenses/update', (req, res) => {
  expenseUtils.updateExpense(req, res);
});

app.post('/expenses/delete', (req, res) => {
  expenseUtils.deleteExpense(req, res);
});

app.post('/expenses/add', (req, res) => {
  expenseUtils.addExpense(req, res);
});

app.post('/expenses/document/add', (req, res) => {
  expenseUtils.addDocument(req, res);
});


let server = app.listen(port, () => {
  let port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;
