var sensor = require('./temp');

module.exports = function(tempModel){
    //send data to database every second
    //sec is used to store the number of points to make graphing easier.
    time = -1;

    setInterval(function(){

	if(time === 20 || time === -1){

	    tempModel.remove(function(err, temperatures){
		if(err){
		    console.error(err);
		}else{
		    console.log('Deleted temperatures!')
		}
	    });
	    
	    time = 0;
	}
	
	var temperature = new tempModel({ temp: temp, time: time });
	temperature.save(function(err){
	    if(err){
		console.log('Error when saving temperatures!!!');
	    }else{
		console.log('Saved temperature OK')
	    }
	});
	time += 1;
    }, 1000);
}


