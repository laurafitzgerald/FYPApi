var should = require('should');
var assert = require('assert');

var supertest = require("supertest");
var should = require("should");
//test case
//This agent refers to PORT where program is running
var server = supertest.agent("http://localhost:8000");
var url = "http://localhost:8000";

//UNIT test begin

describe("Sample unit test", function(done){
	//#1 it should return home page
	it("should return home page", function(done){
		server
		.get("/")
		.expect("Content-type",/json/)
		.expect(200)
		.end(function(err, res){
			//http status should be 200
			res.status.should.equal(200);
			//Erroy key should be false
			res.body.message.should.equal("Hello world");
			done();
		});
	});
});

describe("User", function(){
	it('should return error trying to save duplicate email', function(done){
		var user = {
			email: 'laurafitz@gmail.com',
			username: 'Laura',
			password: 'pass',
			location: 'waterford'
		};
		supertest(url)
		.post('/users')
		.send(user)
		.end(function(err, res){
			if(err){
				throw err;
			}
			//res.should.have.status(400);
			res.status.should.be.equal(400);
			done();

		});
	});

	it('should correctly update an existing account', function(done){
		var body = {email: 'lisafitz@gmail.com', username: 'Lisa Fitz',
					location: 'Tramore', password: 'pass'};
		supertest(url)
				.put('/users/56b9f14c1cec89ec13000001')
				.send(body)
				.expect(200)
				.end(function(err, res){
					if(err)
						throw err;

					res.body.should.have.property('_id');
					//res.body.name.should.equal('Lisa Fitz');
					//res.body.location.should.equal('Tramore');
					res.body.creationDate.should.not.equal(null);
					done();
		});
	});
});
//access the home page