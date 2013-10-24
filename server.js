// silly chrome wants SSL to do screensharing
var fs = require('fs'),
    express = require('express'),
    http = require('http'),
    path = require('path');


var app = express();

app.use(express.static(path.join(__dirname, 'public')));

http.createServer(app).listen(8081);

console.log('running on https://localhost:8080 and http://localhost:8081');
