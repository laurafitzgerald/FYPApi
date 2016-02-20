
var express = require('express');
var router = express.Router;
var Activities = require('../models/activity');
var User = require('../models/user');
var Activity = require('../models/activity');
var lupus = require('lupus');


router.findActivityByUser = function(req, res){
	var activities = [];
	var userid = req.query.id;
	console.log(userid);
	var user = User.findById(userid, function(err,user){

		if(user){
			console.log('found user');
			var activityrefs = user.activities;
			console.log(user.bikes);
			if (activityrefs.length > 0){
				lupus(0, activityrefs.length, function(n){

					var activity = Activity.findById(activitiesrefs(n), function(err, activity){
					if (err)
						res.send(err);
					activities.push(activity);
					}, function(){
					
							res.json(activities);
						
					});
				});
			}else{
					res.json("message", "no activities found for user");
					//need better responses here
					//respond with empty list here
					//Should be a valid return for all error checking
			}
		}else{

			res.json("message", "not a valid user");
			//if an error - return 501 etc.

		}
	});

};

router.createActivityByUser = function(req,res){

	console.log("creating activity");
	var activity = new Activity();
	activity.name = req.body.name;
	activity.distance = req.body.distance;
	activity.speed = req.body.speed;
	activity.type = req.body.type;
	activity.save(function(err){

			console.log('getting user id');
			var userid = req.query.id;
			console.log(userid);
			User.findById(userid, function(err, user){
				console.log('found user');
				if(user){


					user.activities.push(activity.id);
					user.save(function(err){

						if(err)
							res.send(err);
						res.json(activity);

				})

				}else{

					res.json({"message": "not a valid user"});
				}

			})

		})


};

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


module.exports = router;