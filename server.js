var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/06-07', function (req, res) {
  //res.sendFile(path.join(__dirname, 'ui', '06-07.html'));
  res.send('Season 06-07 will be displayed here...');
});

app.get('/07-08', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '07-08.html'));
});

app.get('/08-09', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '08-09.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
