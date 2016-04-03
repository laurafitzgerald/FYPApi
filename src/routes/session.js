var express = require('express');
var router = express.Router;

var utility = require('../utility');

var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);


router.createSession = function(req, res){
		
	console.log("api create sesion");
	nc.request('session.authenticate', JSON.stringify(req.body), function(response){
		console.log("reponse received : " + response);
		res.send(response);
	});

};


module.exports = router;