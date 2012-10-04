var port = 3001;
var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');

http.createServer(ecstatic).listen(port);

console.log("Connect server listening on port %d", port);
