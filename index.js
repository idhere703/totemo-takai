let express = require('express');
let app = express();
let expenseUtils = require('./expenseUtils');
let bodyParser = require('body-parser');
let port = process.env.PORT ? process.env.PORT : 8100;
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/isUp', (req, res) => {
  res.send('Running');
});


let server = app.listen(port, () => {
  let port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = server;
