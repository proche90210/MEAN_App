module.exports = function(app, tempModel, userModel, tokensArray){
    var jwt = require('jwt-simple');
    
    //respond with data from mongo database
    app.get('/mongodata',function(req, res){
		sendTemp(function(mongoTemps){
		    res.json(mongoTemps);
		});
    });
    
    function sendTemp(Callback){

		tempModel.find(function(err, temperatures){
		    if(err) return console.error(err);
		    Callback(temperatures);
		});

    };



    //respond with current temperature data
    app.get('/live', function(req, res){
		var currentTemp = {"currentTemp": temp};
		res.json(currentTemp);
    });



    app.get('/login/:username/:password', function (req, res) {
		var username = req.params.username;
		var password = req.params.password;
		userModel.findOne({ username: username, password: password }, 'username password', function(err, user){
	            if(err){
					console.error(err);
	            } else{
					console.info('User: ' + user);
					if(user === null){
			                    res.json({username: username, success: false});
					}
					else{
			                    var expires = new Date();
			                    expires.setDate((new Date()).getDate() + 1);
			                    var token = jwt.encode({
									username: username,
									expires: expires
			                    }, app.get('jwtTokenSecret'));

			                    tokensArray.push(token);
			                    res.json({ access_token: token, username: username, success: true});
					}
	      		}
		});   
    });
}
