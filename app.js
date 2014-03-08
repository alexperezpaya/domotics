var energyCost = 0.105733 // €/kWh -> http://www.endesaonline.es/ES/empresas/dual/empresas/4/precios/index.asp

var express = require('express');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: false});

server.listen(process.env.PORT || 5000);

app.use(express.bodyParser());
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res){

	res.sendfile(__dirname + '/views/index.html');

});

app.post('/update', function (req, res){

	io.sockets.emit('updates', req.body);

	res.send('ty');

});

app.get('/hook/plug/:value', function (req, res){

});