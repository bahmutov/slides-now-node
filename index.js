#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var content = fs.readFileSync('README.md');
var start = fs.readFileSync(path.join(__dirname, 'template/head.html'));
var end = fs.readFileSync(path.join(__dirname, 'template/body.html'));

var page = start + '\n' + content + '\n' + end;

var http = require('http');
var port = 3700;

function hostPage(page) {
	var server = http.createServer(function (req, res) {
		console.log(req.url);
		if (req.url === '/') {
			res.end(page);
		} else {
			var full = path.join(__dirname, 'lib', req.url);
			res.end(fs.readFileSync(full));
		}
	});

	server.listen(port, function () {
		console.log('listening at port', port);
	});
}

hostPage(page);