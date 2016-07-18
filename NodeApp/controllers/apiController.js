module.exports = function(app){

    var logger = require('morgan');
    var cors = require('cors');
    var tokensArray = [];

    //shows GET requests in the console
    app.use(logger('dev'));

    app.use(cors());
    app.set('jwtTokenSecret', 'raspPItoken');
    

    // create schema and read in temperatures
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://mongodb2289rp:mi6fys@danu7.it.nuigalway.ie:8717/mongodb2289');

    var userModel = mongoose.model('User', { username: String, password: String});
    var tempModel = mongoose.model('Temperature', { temp: Number, time: Number});

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Database Connection Error: '));
    db.once('open', function(){
	console.info('Connected to the database...');
    });
    

    var storeTemps = require('./storeTemps');
    storeTemps(tempModel);
    
    var getRequests = require('./get-requests');
    getRequests(app, tempModel, userModel, tokensArray);


    var postRequests = require('./post-requests');
    postRequests(app, userModel, tokensArray);

};



