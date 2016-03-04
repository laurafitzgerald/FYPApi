

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedSchema = new Schema({
	user_id: String
	activities: []

});

module.exports = mongoose.model('Feed', FeedSchema);
