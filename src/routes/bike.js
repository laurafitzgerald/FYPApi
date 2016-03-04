
var express = require('express');
var router = express.Router;
var Bike = require('../models/bike');
var User = require('../models/user');
var lupus = require('lupus');



var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);

router.editBike = function(req,res){

	var bike = new Bike();
	bike.nickname = req.body.nickname;
	bike.make = req.body.make;
	bike.model = req.body.model;

	var id = req.query.id;

	Bike.findOneAndUpdate({_id: id}, {$set: {"nickname": bike.nickname, "make": bike.make, "model": bike.model}}, {upsert: true}, function(err, bike){
		if(err) return res.send(500, {error: err});
		res.send(bike);

	});


}

router.findBikeByUser = function(req, res){
	

	var msg = req.params.id;

	nc.request('bike.read.byuser', msg, function(response){
		console.log("got a respons in msg stream : " + response);
		res.send(JSON.stringify(response));

	})

	/*
	var bikes = [];
	var userid = req.query.id;
	console.log(userid);
	User.findById(userid, function(err,user){

		if(user){
			console.log('found user');
			var bikerefs = user.bikes;
			if (bikerefs.length > 0){
				lupus(0, bikerefs.length, function(n){
						Bike.findById(bikerefs[n], function(err, bike){
						if (err)
							res.send(err);
						bikes.push(bike);

						});
					}, function(){
					
							res.json(bikes);
						
					});
			}else{
					res.json("message", "no bikes found for user");
			}
		}else{

			res.json("message", "not a valid user");

		}
	});
*/

};


router.createBikeByUser = function(req,res){

		console.log("trying to create a bike");
		var json = JSON.stringify(req.body)
		nc.request('bike.create', json, function(response){

			console.log("got a response in msg stream: " + response);
				res.send({"message": "bike added"});
		});


	/*
	console.log("creating bike");
	var bike = new Bike();
	bike.nickname = req.body.nickname;
	bike.make = req.body.make;
	bike.model = req.body.model;
	bike.save(function(err){

			console.log('getting user id');
			var userid = req.query.id;
			User.findById(userid, function(err, user){
				
				if(user){

					console.log('found user');
					user.bikes.push(bike.id);
					user.save(function(err){

						if(err)
							res.send(err);
						res.json(bike);

					});

				}else{

					res.json({"message": "no user found"});
				}

			});

		});
*/


};


router.findAllBikes = function(req, res){

	Bike.find(function(err, bikes){
			if(err)
				res.send(err);
			res.json(bikes);

		});

};

module.exports = router;