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

router.findUser = function(req, res){
		User.findOne({_id: req.params.id}, function(err, user){

			if(err)	
				res.status(404)
				   .send('Not found');
			res.json(user);

		})



}
router.create = function(req, res){


		console.log("creating user");
		var user = new User();
		user.email = req.body.email;
		user.name = req.body.name;
		user.password = req.body.password;
		user.location = req.body.location;
		user.bikes = [];
		user.activities = [];
	

		user.save(function(err){
			if(err){
				res.send(400);
			}
			res.json(user);

		})

	

	
}
router.deleteUser = function(req, res){

	console.log("deleting a user")
	User.remove({_id: req.params.id}, function(err){
		if(err)
			res.send(err);
		res.json({"message": "user removed"});

	})

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