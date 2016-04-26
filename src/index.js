var express = require('express');
var app = express(); 
var bodyParser = require('body-parser')
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Constants
var PORT = process.env.PORT || 8000;

var router = express.Router();
	
var usersroute = require('./routes/user');
var bikesroute = require('./routes/bike');
var friendshipsroute = require('./routes/friendship');
var activitiesroute = require('./routes/activity');
var reportsroute = require('./routes/report');
var sessionsroute = require("./routes/session");

router.use(function(req, res, next){

	next();

});
app.use(cors());


app.post('/sessions', sessionsroute.createSession);
////////////////////////////////
///////////////////User REST API

app.get('/users', usersroute.findAll);
app.post('/users', usersroute.create);
app.get('/users/:username', usersroute.findUser);
app.get('/users/:location', usersroute.findUser);
app.delete('/users/:username', usersroute.deleteUser);
app.put('/users/:id', usersroute.updateUser);
///////////////////////////
///////////////////////Bike REST API

//app.get('/bikes', bikesroute.findAllBikes);
app.get('/bikes', bikesroute.findBikeByUser);
app.get('/bikes/:serial_number', bikesroute.findBikeBySerial);
app.post('/bikes', bikesroute.createBikeByUser);
app.put('/bikes', bikesroute.editBike);
app.delete('/bikes/:serial_number', bikesroute.deleteBike);


//////////////////////////
//////////////////////////
//app.get('/friendship', friendshipsroute.findAllFriendships);
app.post('/friendship', friendshipsroute.createFriendship);
app.get('/friendships', friendshipsroute.findFriendShipsByUser);
app.delete('/friendships/:id', friendshipsroute.deleteFriendship);

//////////////////////////
///////////////////Activity REST API
app.put('/activities', activitiesroute.updateActivity);
app.post('/activities', activitiesroute.createActivityByUser);
app.get('/activities', activitiesroute.findActivitiesByUser);
app.get('/activities/:username', activitiesroute.findActivitiesByUser);
app.delete('/activities/:id', activitiesroute.deleteActivity);



/////////////////////////
///////////////////Report REST API
app.put('/reports/:id' , reportsroute.updateReport);
app.get('/reports', reportsroute.findReports);
app.post('/reports', reportsroute.createReport);
app.get('/reports/:id', reportsroute.findReportByID);
app.delete('/reports/:id', reportsroute.deleteReport);


router.get('/', function (req, res) {
  res.json({"message" : "Hello world"});
});

///cors middleware

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}


router.use(allowCrossDomain);
app.use('/', router);

//app.listen(PORT, "0.0.0.0");
app.listen(PORT);

console.log('Running on http://localhost:' + PORT);
