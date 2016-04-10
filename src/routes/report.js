var express = require('express');
var router = express.Router;

var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);


var authenticate = require('../utility');

router.deleteReport = function(req, res){

var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);

	authenticate.validateSession(sessionkey,
		function(username){
			nc.request('report.delete', JSON.stringify(req.params.id), function(response){

				if(!response)
					res.send(400);
				else
					res.send(response);

			});

	},
		function(){
			res.send(401);
		});

}


router.updateReport = function(req, res){

	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);

	authenticate.validateSession(sessionkey,
		function(username){
			console.log(req.params);
			console.log(req.query);
			console.log(req.body);
			var obj = req.body;
			obj.id = req.params.id;
			nc.request('report.update', JSON.stringify(obj), function(response){

				res.send(response);

			});


		},
		function(){
			res.send(401);
		});


}

router.createReport = function(req, res){
	

	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);

	authenticate.validateSession(sessionkey,
		function(username){
			//make sure the bike is a valid bike name
			var obj = req.body;
			console.log(JSON.stringify(obj));
			if(obj.hasOwnProperty("nickname")){
				var msgquery = obj.nickname;
				nc.request('bike.read.by.nickname', JSON.stringify(msgquery), function(response){
					if(response=="")	
						res.send(400);
					else
						nc.request('report.create', JSON.stringify(req.body), function(response){
							console.log("response recieved from report.create" + response);

							if(response)
								res.send(200);
							res.send(400);

						});


				});
				
			}
			//or check that the serial number is a registered serial number
			if(obj.hasOwnProperty("serial_number")){
				var msgquery = obj.serial_number;
				console.log(msgquery);
				nc.request('bike.read.by.serial_number', JSON.stringify(msgquery), function(response){
					if(response=="")	
						res.send(400);
					else
						nc.request('report.create', JSON.stringify(req.body), function(response){
							console.log("response recieved from report.create" + response);

							if(response)
								res.send(200);
							res.send(400);

							});

				});
			
			}


		
			
		},
		function(){
			res.send(401);
		});


}

router.findReportByID = function(req, res){

	console.log("findReport by id method");
	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){
			console.log(username);
			var obj = req.params;
			console.log(obj);
			console.log(req.body);
			console.log(req.query);
			if(obj.hasOwnProperty("username")){
				console.log("searching for report by username");
				var msgQuery = obj.username;
				nc.request('report.read.by.username', JSON.stringify(msgQuery), function(response){

						if(response=="")
							res.send(404);
						res.send(response);

				});

			}
			if(obj.hasOwnProperty("id")){
				
				var msgQuery = obj.id;
				console.log("searching for report by id");
				nc.request('report.read.by.id', JSON.stringify(msgQuery), function(response){

						if(response=="")
							res.send(404);
						res.send(response);

				});
			}else{
				res.send(400);
			}
		},
		function(){
			res.send(401);
		});




};

router.findReports = function(req, res){


	var sessionkey = req.get("XAuth");
	console.log("Session key : " + sessionkey);
	authenticate.validateSession(sessionkey,
		function(username){

			var obj = req.query;
			console.log(req.query);
			if(obj.hasOwnProperty("serial_number")){
				var msgQuery = obj.serial_number;
				console.log("searching report by serial_number" + msgQuery);

				nc.request('report.read.by.serial_number', JSON.stringify(msgQuery), function(response){

					if(response=="")
						res.send(400);
					res.send(response);

				});
			}
			if(obj.hasOwnProperty("username")){
				var msgQuery = obj.username;
				console.log("searching report by username");
				nc.request('report.read.by.username', JSON.stringify(msgQuery), function(response){
					if(response=="")
						res.send(400);
					res.send(response);

				});

			}
			if(obj.hasOwnProperty("pulse_number")){
				var msgQuery = obj.pulse_number;
				console.log("searching report by pulse_number");
				nc.request('report.read.by.pulse_number', JSON.stringify(msgQuery), function(response){
					if(response=="")
						res.send(400);
					res.send(response);

				});

			}

		},
		function(){
			res.send(401);
		});



}

module.exports = router;
