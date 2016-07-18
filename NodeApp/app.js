var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening on port 3000.....');


var apiController = require('./controllers/apiController');
apiController(app);
