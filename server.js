var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
app.use(morgan('combined'));

var config = {
    user: 'vishalkrishan4542',
    database: 'vishalkrishan4542',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var counter=0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});

var pool = new Pool(config);
app.get('/test-db',function(req,res)
{
	//make a query
		//return a response
	pool.query('select * from test',function(err,result) 
    { 
		if(err)
        {
			res.status(500).send(err.toString());
		}
		else
        {
			res.send(JSON.stringify(result.rows)); 
		}
	});

});

function hash(input, salt){
    //create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'it-will-gonna-be-awesome');
    res.send(hashedString);
});

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
