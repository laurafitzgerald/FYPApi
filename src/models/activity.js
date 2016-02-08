
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({

	date: {type: Date, default: Date.now},
	name: String,
	distance: Number,
	speed: Number,
	type: String

});

module.exports = mongoose.model('Activity', ActivitySchema);
