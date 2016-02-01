function User(username_in, email_in, password_in, location_in){
	
	this.email = email_in;
	this.name = username_in;
	this.password = password_in;
	this.location = location_in;
	
}

module.exports = User;
