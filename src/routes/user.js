var User = require('../models/user');
var express = require('express');
var Bike = require('../models/bike');
var router = express.Router();

var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);

//////////////////////////////////////
//HTTP responses
//400 Bad Request
//https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

/*
var testBike = new Bike('1', 'wheels', 'giant', 'avail');
var bikes = [];

var testuser = new User('laurafitz','laurasemail@email.com','pass', 'Waterford', bikes);
testuser.bikes.push(testBike);
var users = [testuser];*/

////////////////////////////////
///////////////////User REST API

router.findAll  = function(req, res){	
		nc.request('user.read.all', function(response){
			console.log("got a response from user.read.all");

				res.send(response);
		});
	};

router.findUser = function(req, res){
	nc.request('user.read.one', req.params.username, function(response, reply){
		if(response)
			res.send(response);
		res.send(400);
	});
}

router.create = function(req, res){
	//any domain specific validation happens in the specific service 
		nc.request('user.create', JSON.stringify(req.body), function(response){
			if(response){
				res.send(200);
			}
			res.send(400);			
		});
}
router.deleteUser = function(req, res){

	console.log("deleting a user")
	nc.request('user.delete', req.params.username, function(response, reply){
		if(response){
			res.send(200);
		}
		res.send(400);

	});
	/*
	User.remove({_id: req.params.id}, function(err){
		if(err)
			res.send(err);
		res.json({"message": "user removed"});

	})*/

}

router.updateUser = function(req, res){

	var user = new User();
	user.email = req.body.email;
	user.name = req.body.name;
	user.password = req.body.password;
	user.location = req.body.location;

	var id = req.params.id;
	console.log(id);

	console.log("updating user");
	User.findOneAndUpdate({_id: id}, {$set: {"email": user.email, "name": user.name, "password": user.password, "location": user.location}}, {upsert: true}, function(err, user){
		if(err) return res.send(500, {error: err});
		res.send(user);

	});


}
module.exports =router;
/*
	.post(function(req, res){
		var bikes = [];
		var user = new User(req.body.name, req.body.location, req.body.password, req.body.email, bikes);
		var convertedUser = JSON.stringify(user);
		users.push(user);
		res.json(users);

	})

	.delete(function(req, res){



	})




router.route('/users/:user_id')
	.get(function(req, res){

		var result = users.filter(function(obj){
			return obj.username == req.params.user_username
		});

		res.json(result);
	})
	*/