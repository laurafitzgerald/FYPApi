module.exports = [

	{
		pattern: 'http://localhost:8000/users',
		fixtures: '../models/user.js',
		callback: function(match, data){

			return {body: data};
		}
	}



];