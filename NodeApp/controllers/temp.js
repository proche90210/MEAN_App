var sensor = require('ds18x20');

//check the driver is loaded
sensor.isDriverLoaded(function (err, isLoaded){
//	console.log(isLoaded);
});

//load the driver
sensor.loadDriver(function (err) {
	if (err) console.log('something went wrong loading the driver: ',err)
//	else console.log('driver is loaded');
});

//get temperature from the sensor and store it globally every 1s
temp = sensor.get('28-0000075005d7');
setInterval(function(){
    temp = sensor.get('28-0000075005d7');
}, 1000);
