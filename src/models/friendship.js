
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FriendshipSchema = new Schema({
	user_id: String,
	friend_id: String,
	start_date: Date,
	_status: String

});

module.exports = mongoose.model('Friendship', FriendshipSchema);
