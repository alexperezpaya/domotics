// Gatherer data engine to get information from the sensors and to comunicate with Heroku server to manage connections

//http://192.168.1.55:8083/ZWaveAPI/Run/devices[5].instances[0].commandClasses

var async = require('async');
var request = require('request');

var Zwave = require(__dirname + '/lib/zwave');

var zwave = new Zwave({
	address: '0.0.0.0:8083'
});

var gatherer = function (){

	async.parallel([

		function (callback){

			async.waterfall([function (callback){

				zwave.update(2, 0, 49, callback);

			}, function (err, response, callback){

				zwave.getDeviceCommandClass(2, 0, 49, function (err, data){
					//console.log(data.instances[0].commandClasses[49].data[3].val.value);
					callback(err, data);
				});

			}], function (err, data){

				var multisensor = {};

				async.map([1,3,5], function (key, callback){
					
					multisensor[data.data[key].sensorTypeString.value.toLowerCase()] = data.data[key].val.value;
					callback(null);

				}, function (err){
					callback(null, multisensor);
				});


			});

		},

		function (callback){
			
			async.waterfall([

				function (cb){

					async.map([37, 49, 50], function (id, _cb){
						zwave.update(5, 0, id, _cb);
					}, function (err){
						cb(err);
					});

				},

				function (cb){

					zwave.getDeviceCommandClasses(5, 0, function (err, data){

						var result = {
							plugActive: data[37].data.level.value,
							power: data[49].data[4].val.value
						}

						cb(err, result);

						//http://192.168.1.55:8083/ZWaveAPI/Run/devices[5].instances[0].commandClasses
					});
				
				}

			], function (err, result){
				callback(err, result);
			});
		}

	], function (err, result){

		// POST CODE TO MAIN SERVER THAT MANAGES ALL DATA AND STATS

		var data = {
			plug: result[1],
			sensor: result[0],
			ts: Date.now()
		}

		request.post('http://home.perezpaya.net/update', function (err, response, body){
			if(err){
				console.log(err);
			}
		}).form(data);

		setTimeout(gatherer, 1000);
	});

};

gatherer();