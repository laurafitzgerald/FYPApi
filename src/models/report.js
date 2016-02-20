var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({

	type: String,
	location: {lng: Number, lat: Number},
	pulse_number: String,
	bike_id: String
});

module.exports = mongoose.model('Report', ReportSchema);
