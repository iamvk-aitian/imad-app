var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var counter=0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
})

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/first_one', function (req, res){
    res.sendFile(path.join(__dirname, 'ui', 'first_one.html'));
});

app.get('/second_one', function (req, res){
    res.send('second_one request is now gonna serevd');
});

app.get('/third_one', function (req, res){
    res.send('third_one request is now gonna serevd');
});

app.get('/ui/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function(req, res)   {
    res.sendFile(path.join(__dirname, 'ui', 'main.js')); 
});
var names=[];
app.get('/submit-name', function(req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});
    
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(80 , function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
