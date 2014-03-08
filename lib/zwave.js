var request = require('request');

var Zwave = function (settings){

	this.address = settings.address;
}


Zwave.prototype.setValue = function (deviceId, instance, commandClass, value, callback){

	request.get('http://'+this.address+'/ZWaveAPI/Run/devices[' + deviceId + '].instances['+instance+'].commandClasses['+commandClass+'].Set('+value+')', function (err, response, body){

		if(err){
			callback(err);
		} else {
			callback(null, JSON.parse(body), response);
		}

	});

};

Zwave.prototype.update = function (deviceId, instance, commandClass, callback){

	request.get('http://'+this.address+'/ZWaveAPI/Run/devices[' + deviceId + '].instances['+instance+'].commandClasses['+commandClass+'].Get()', function (err, response, body){

		if(err){
			callback(err);
		} else {
			callback(null, JSON.parse(body), response);
		}

	});

};

Zwave.prototype.getDevices = function (callback){

	request.get('http://' + this.address + '/ZWaveAPI/Run/devices', function (err, response, body){

		if(err){
			callback(err);
		} else {
			callback(null, JSON.parse(body), response);
		}

	});

};

Zwave.prototype.getDevice = function (deviceId, callback){

	request.get('http://' + this.address + '/ZWaveAPI/Run/devices[' + deviceId + ']', function (err, response, body){

		if(err){
			callback(err);
		} else {
			callback(null, JSON.parse(body), response);
		}

	});

};

Zwave.prototype.getDeviceCommandClasses = function (deviceId, instance, callback){
	request.get('http://' + this.address + '/ZWaveAPI/Run/devices[' + deviceId + '].instances['+instance+'].commandClasses', function (err, response, body){

		if(err){
			callback(err);
		} else {
			callback(null, JSON.parse(body), response);
		}

	});
};

Zwave.prototype.getDeviceCommandClass = function (deviceId, instance, commandClass, callback){
	request.get('http://' + this.address + '/ZWaveAPI/Run/devices[' + deviceId + '].instances['+instance+'].commandClasses['+ commandClass+']', function (err, response, body){

		if(err){
			callback(err);
		} else {
			callback(null, JSON.parse(body), response);
		}

	});
};

module.exports = Zwave;