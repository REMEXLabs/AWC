var path = require('path'),
  express = require('express');

var app = express(),
  staticPath = path.join(__dirname, './');

app.use(express.static(staticPath));
app.listen(3000, function () {
  console.log('Start server on 127.0.0.1:3000');
});
