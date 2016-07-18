var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function(app, userModel, tokensArray){
    app.post('/logout', jsonParser, function(req, res) {
		var token= req.body.access_token;
		removeTokens(token);
		res.sendStatus(200);
    });
    
    function removeTokens(token) {
		for (var i = 0; i < tokensArray.length; i++) {
	            if (tokensArray[i] === token) {
					tokensArray.splice(i, 1);
					break;
	            }
		}
    }


    app.post('/registerUser', jsonParser, function (req, res) {
		userModel.findOne({ username: req.body.username }, 'username', function(err, user){
	            if(err){
					console.error(err);
	            } else{
					if(user !== null){

			            res.json({username: req.body.username, password: req.body.password, regStatus: false});

					} else{
			            var users = new userModel({
							username: req.body.username,
							password: req.body.password
			            });

			            users.save(function(err){
							if(err){
				                console.log('Error when saving user.');
							}else{
				                console.log('User saved.')
							}
			            });

			            res.json({username: req.body.username, password: req.body.password, regStatus: true});
			                    
					}
	            }
		});
	 });

}

