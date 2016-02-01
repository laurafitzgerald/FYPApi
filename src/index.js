var express = require('express');
var app = express(); 
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Constants
var PORT = process.env.PORT || 8000;
var User = require('./models/user');
var router = express.Router();


var users = [{username: 'laurafitz', email: 'laurasemail@email.com', password: 'pass', location: 'Waterford' }];

router.use(function(req, res, next){

	next();

});
// App

router.route('/users')
	.get(function(req, res){
		//request for data from db goes here
		res.json(users);

	})

	.post(function(req, res){
		var user = new User(req.body.name, req.body.location, req.body.password, req.body.email);
		var convertedUser = JSON.stringify(user);
		users.push(JSON.parse(convertedUser));
		res.json(user);

	})


router.route('/users/:username')
	.get(function(req, res){
		res.json({message: req.params.username});
	})

router.get('/', function (req, res) {
  res.send('Hello world\n');
});


app.use('/', router);

//app.listen(PORT, "0.0.0.0");
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
