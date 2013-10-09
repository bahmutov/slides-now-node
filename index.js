#!/usr/bin/env node

if (process.argv.length < 3) {
	console.error('missing .md filename');
	process.exit(-1);
}

var mdFilename = process.argv[2];
var mdName = /\.md|\.markdown|\.txt|\.md.txt$/i;
if (!mdName.test(mdFilename)) {
	console.error('invalid markdown filename', mdFilename);
	console.error('should end with .md');
	process.exit(-2);
}

var fs = require('fs');
var path = require('path');
var launcher = require('opener');
var http = require('http');

var content = fs.readFileSync(mdFilename);
var start = fs.readFileSync(path.join(__dirname, 'template/head.html'));
var end = fs.readFileSync(path.join(__dirname, 'template/body.html'));

var page = start + '\n' + content + '\n' + end;

var port = 3700;
var exitAfter = 5; // seconds

function hostPage(page) {
	var server = http.createServer(function (req, res) {
		console.log(req.url);
		if (req.url === '/') {
			res.end(page);
		} else {
			var full = path.join(__dirname, 'lib', req.url);
			res.end(fs.readFileSync(full));

			if (req.url === '/slides-now.js') {
				console.log('served application, exitting in', exitAfter, 'seconds');
				setTimeout(function () {
					process.exit(0);
				}, exitAfter * 1000);
			}
		}
	});

	server.listen(port, function () {
		console.log('listening at port', port);
		launcher('http://localhost:' + port);
	});
}

hostPage(page);
