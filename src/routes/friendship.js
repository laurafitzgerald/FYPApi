var express = require('express');
var router = express.Router;
var Activities = require('../models/activity');
var Friendship = require('../models/friendship');
var User = require('../models/user');
var lupus = require('lupus');


router.findFriendShipsByUser = function(req, res){
	var userid = req.query.id;
	var users = Friend.findAll({user_id:userid}, function(err,user){

		if(users.length>0){

			res.json(users);

		}else{
			res.json({"message": "no friendships found"});
		}
	});

};

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

router.createFriendship = function(req, res){

	console.log("creating friendship");
	var friendship = new Friendship();
	friendship.user_id = req.body.user_id;
	friendship.friend_id = req.body.friend_id;
	friendship._status = "REQUEST";

	friendship.save(function(err){
		if(err)
			res.send(err)

		res.json(friendship);
		

	});



}



module.exports = router;