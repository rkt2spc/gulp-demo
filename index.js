var http = require('http'),
    path = require('path');

//------------------------------------------------------------------------
var express = require('express');

var app = express();

//------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

//------------------------------------------------------------------------
var port = 3000;

http.createServer(app).listen(port, function () {
	console.log('Server listening at port', port);
});