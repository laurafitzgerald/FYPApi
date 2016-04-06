var express = require('express');
var router = express.Router;
var Activities = require('../models/activity');
var Friendship = require('../models/friendship');
var User = require('../models/user');
var lupus = require('lupus');


var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);

var authenticate = require('../utility');

router.findFriendsBySearch = function(req, res){


	var sessionkey = req.get("XAuth");
		console.log("Session key : " + sessionkey);

		authenticate.validateSession(sessionkey,
			function(username){
				var obj = req.params;
				if(obj.hasOwnProperty('username')){
					var query = "Lau";
					var paramquery = req.params.searcName;
					nc.request('friendship.find.by.username',  JSON.stringify(query) , function(response){
						console.log("searching by username");
						if(response.length==0)
							res.send(400);
						else
							res.send(response);


					});
				}
				if(obj.hasOwnProperty('location')){


					console.log("searching by location - needs to be written");
					res.send(404);

				}


			},
			function(){
				res.send(401);
			});




}

router.deleteFriendship = function(req, res){


	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){
			console.log(JSON.stringify(req.params));
			nc.request('friendship.delete', JSON.stringify(req.params), function(response){
				console.log("got a respons in msg stream : " + response);
				res.send(response);

			});
		},
		function(){
			res.send(401);
		});


}

router.findFriendShipsByUser = function(req, res){
	
		var sessionkey = req.get("XAuth");
		console.log("Session key : " + sessionkey);

		authenticate.validateSession(sessionkey,
			function(username){
				console.log(req.query);
				var obj = req.query;
		
				
				if(obj.hasOwnProperty('username')){
					var query = {};
					query.username = obj.username;
					
					console.log("searching by username");
					nc.request('friendship.find.by.username',  JSON.stringify(query) , function(response){
						
						if(response.length==0)
							res.send(400);
						else
							res.send(response);


					});
				}
				else if(obj.hasOwnProperty('location')){
					var query = {};
					query.location = obj.location;

					console.log("searching by location");
					nc.request('friendship.find.by.location',  JSON.stringify(query) , function(response){
						
						if(response.length==0)
							res.send(400);
						else
							res.send(response);


					});

				}


				else{

					nc.request('friendship.read.by.user', username, function(response){
						res.send(response);
					});
				}	
			},
			function(){
				res.send(401);
			});

};

/*
router.findAllFriendships = function(req, res){


	Friendship.find(function(err, friendships){
		if(err)
			res.send(err);
		if(friendships.length>0)
			res.json(friendships)
		else
			res.json({"message": "no friendships"});
	});


};
*/
router.createFriendship = function(req, res){

	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);

	authenticate.validateSession(sessionkey,
		function(username){
			console.log("creating friendship");
			var obj = req.body;
			obj.user_name= req.body.user_name;
			obj.friend_name = req.body.friend_name;
			console.log(JSON.stringify(obj));
			nc.request('friendship.create', JSON.stringify(obj), function(response){
				if(response)
					res.send(200);
				res.send(400);

			});
		},
		function(){
			res.send(401);
		});

}



module.exports = router;