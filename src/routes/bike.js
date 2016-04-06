
var express = require('express');
var router = express.Router;
var Bike = require('../models/bike');
var User = require('../models/user');
var lupus = require('lupus');



var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);

var authenticate = require('../utility');


router.editBike = function(req,res){

	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){

			var bike = new Bike();
			bike.nickname = req.body.nickname;
			bike.make = req.body.make;
			bike.model = req.body.model;

			var id = req.query.id;

			Bike.findOneAndUpdate({_id: id}, {$set: {"nickname": bike.nickname, "make": bike.make, "model": bike.model}}, {upsert: true}, function(err, bike){
				if(err) return res.send(500, {error: err});
				res.send(bike);

			});
		},
		function(){
			res.send(401);
		});
			


}

router.findBikeByUser = function(req, res){
	
	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){
			nc.request('bike.read.by.user', username, function(response){
				console.log("got a respons in msg stream : " + response);
				res.send(response);

			});
		},
		function(){
			res.send(401);
		});

};

router.findBikeBySerial = function(req, res){

	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){
			console.log("read by serial number")
			nc.request('bike.read.by.serial_number', JSON.stringify(req.params), function(response){
				console.log("got a response in msg stream : " + response);
				res.send(response);

			});
		},
		function(){
			res.send(401);
		});


}

router.deleteBike = function(req, res){
	
	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){
			console.log(JSON.stringify(req.params));
			nc.request('bike.delete', JSON.stringify(req.params), function(response){
				console.log("got a respons in msg stream : " + response);
				res.send(response);

			});
		},
		function(){
			res.send(401);
		});


}

router.createBikeByUser = function(req,res){


		var sessionkey = req.get("XAuth");
		console.log("Session key : " + sessionkey);
		authenticate.validateSession(sessionkey,
			function(username){
					
				console.log("trying to create a bike");
				
				nc.request('user.read.one', username, function(response){

					if(response=="")	
						res.send(400);
				});

				var obj = req.body;
				obj.username = username;
				nc.request('bike.create', JSON.stringify(obj), function(response){

					console.log("got a response in msg stream: " + response);
					res.send(response);
				});
			},
			function(){
				res.send(401);
			});

};



/*
router.findAllBikes = function(req, res){

	Bike.find(function(err, bikes){
			if(err)
				res.send(err);
			res.json(bikes);

		});

};
*/

module.exports = router;