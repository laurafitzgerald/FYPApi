
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BikeSchema = new Schema({

	nickname: String,
	make: String,
	model: String
});

module.exports = mongoose.model('Bike', BikeSchema);


/*



function Bike(id, nickname_in, make_in, model_in){
	this.id = id;
	this.nickname = nickname_in;
	this.make = make_in;
	this.model = model_in;
}

module.exports = Bike;*/