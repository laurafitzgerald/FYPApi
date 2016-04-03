
var express = require('express');
var router = express.Router;

var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);

var authenticate = require('../utility');



router.deleteActivity = function(req, res){


	var sessionkey = req.get("XAuth");

	authenticate.validateSession(sessionkey,
		function(username){
			
			nc.request('activity.delete', JSON.stringify(req.params.id), function(response){

				if(!response)
					res.send(400);
				else
					res.send(response);

			});
		},
		function(){
			res.send(401);
		});


};



router.findActivitiesByUser = function(req, res){

	var sessionkey = req.get("XAuth");

	authenticate.validateSession(sessionkey,
		function(username){
			nc.request('activity.read.byuser', username, function(response){
				res.send(response);
			});
		},
		function(){
			res.send(401);	
		});


};

router.createActivityByUser = function(req,res){
		
		var sessionkey = req.get("XAuth");
		console.log("Session key : " + sessionkey);

		authenticate.validateSession(sessionkey,
			function(username){
				nc.request('user.read.one', req.body.username, function(response){
					console.log(typeof response);
					console.log(response);
					if(response=="")	
						res.send(400);
				})

				nc.request('activity.create', JSON.stringify(req.body), function(response){
					if(response)
						res.send(200);
					res.send(400);
				});

			},
			function(){
				res.send(401);
			});

};
/*
//will need to get rid of this 
router.findAllActivities = function(req, res){


	Activities.find(function(err, activities){
		if(err)
			res.send(err);
		if(activities.length>0)
			res.json(activities)
		else
			res.json({"message": "no activities"});
	})


};
*/

module.exports = router;