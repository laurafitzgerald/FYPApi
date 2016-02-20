var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({

	email: {type: String, unique : true } ,
	name: String,
	password: String,
	location: String,
	bikes: Array,
	activities: Array

});

module.exports = mongoose.model('User', UserSchema);


/*function User(username_in, email_in, password_in, location_in, bikes){
	
	this.email = email_in;
	this.name = username_in;
	this.password = password_in;
	this.location = location_in;
	this.bikes = bikes
}

module.exports = User;
*/