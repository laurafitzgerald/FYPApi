var express = require('express');
var router = express.Router;
var Bike = require('../models/bike');
var Report = require('../models/report');
var lupus = require('lupus');




router.createReport = function(req, res){

	var report = new Report();
	report.location.lng = req.body.lng;
	report.location.lat = req.body.lat;
	report.pulse_number = req.body.pulse_number;
	report.bike_id = req.params.bike_id;

	report.save(function(err){
		if(err)
			res.send(err);
		res.json(report);
	});
}

router.findAllReports = function(req, res){

	Report.find(function(err, reports){
		if(err)
			res.send(err);
		res.json(reports);

	});
}

module.exports = router;
