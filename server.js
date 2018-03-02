var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'someRsndomSecretValue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

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
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'it-will-gonna-be-awesome');
    res.send(hashedString);
});
app.post('/create-user', function(req, res){
   //input-username, password
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES($1, $2)', [username, dbString], function(err, result){
       if(err)
        {
			res.status(500).send(err.toString());
		}
		else
        {
			res.send('User Successfully created with username :' + username); 
		}
   });
});
app.post('/login', function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   pool.query('SELECT * From "user" WHERE username = $1', [username], function(err, result){
       if(err)
        {
			res.status(500).send(err.toString());
		}
		else
        {
            if(result.rows.length === 0){
                res.send(403).send('username/password is invalid');
            }
            else {
                //match the password
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);//creating a hash based on the password submitted and the original salt
                if(hashedPassword === dbString){
                    //set the session
                    req.session.auth = {userId: result.rows[0].id};
                    //set cookie with a session id
                    //internally, on the server side, it maps the session id to an object
                    //{auth: {userId}}
                    res.send('Credentials are Correct');
                    
                }
                else{
                    res.send(403).send('username/password is invalid');
                }
            }
        }
   });
});
app.get('/check-login', function(req, res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in with session id : ' + req.session.auth.userId.toString());
   }
   else{
       res.send('You are not logged in');
   }
});
app.get('/logout', function(req, res){
    delete req.session.auth;
    res.send('You are logged out');
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