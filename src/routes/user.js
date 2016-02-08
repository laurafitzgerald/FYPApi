var User = require('../models/user');
var express = require('express');
var Bike = require('../models/bike');
var router = express.Router();

/*
var testBike = new Bike('1', 'wheels', 'giant', 'avail');
var bikes = [];

var testuser = new User('laurafitz','laurasemail@email.com','pass', 'Waterford', bikes);
testuser.bikes.push(testBike);
var users = [testuser];*/

////////////////////////////////
///////////////////User REST API

router.findAll  = function(req, res){
		//request for data from db goes here
		//res.json(users);
		User.find(function(err, users){
			if(err)
				res.send(err);
			res.json(users);

		});

	};

router.findOne = function(req, res){
		var user = findById(req.params)
		res.json(user);


}
router.create = function(req, res){


		console.log("creating user");
		var user = new User();
		user.email = req.body.email;
		user.name = req.body.name;
		user.password = req.body.password;
		user.location = req.body.location;
		user.bikes = req.body.bikes;
	

		user.save(function(err){
			if(err)
				res.send(err);
			res.json(user);

		})

	

	
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