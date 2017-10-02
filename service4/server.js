var http = require('http');

var server = http.createServer(function (request, response) {
    console.log("Request " + request.httpVersion + " " + request.method + " " + request.url);
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello from service 4");
});

server.listen(80, function () {
    console.log("Server running at http://127.0.0.1:80/");
});