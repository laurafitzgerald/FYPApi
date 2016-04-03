

var nats = require('nats');
var servers = ['nats://nats.default:4222'];
var nc = nats.connect({'servers': servers});
console.log("Connected to " + nc.currentServer);



module.exports = {
	validateSession : function(sessionkey, success, failure){
		var obj ={};
		obj.sessionkey = sessionkey;
	
		nc.request('session.authenticate', JSON.stringify(obj), function(response){
			console.log("Response : " + response);
			if(response==""){
				failure();
			}else{
				success(response);
			}
		});
	

	}
};