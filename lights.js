
var async = require('async');

var Zwave = require(__dirname + '/lib/zwave');

var zwave = new Zwave({
	address: '0.0.0.0:8083'
});

var lightOn = false;

setInterval(function () {

	async.waterfall([function (callback){

		zwave.update(2, 0, 49, callback);

	}, function (err, response, callback){

		zwave.getDevice(2, function (err, data){
			//console.log(data.instances[0].commandClasses[49].data[3].val.value);
			callback(err, data);
		});

	}], function (err, data){

		var luminosity = data.instances[0].commandClasses[49].data[3].val.value;

		if(luminosity <= 200){
			if(!lightOn){
				zwave.setValue(5, 0, 37, 255, function (err, response){
					console.log('Turned on light');
					lightOn = true;
				});
			}
		} else{
			
			if(lightOn){
				zwave.setValue(5, 0, 37, 0, function (err, response){
					console.log('Turned off light');
					lightOn = false;
				});
			}
		}
	});
	
}, 500);