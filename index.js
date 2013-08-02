var fs = require('fs');
var path = require('path');

var content = fs.readFileSync('README.md');
var start = fs.readFileSync(path.join(__dirname, 'template/head.html'));
var end = fs.readFileSync(path.join(__dirname, 'template/body.html'));

