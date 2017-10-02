var http = require('http');
// var req = require('request');
var contextful = require('./contextful');
var request = require('request');

var server = http.createServer(function (req, response) {
    var service2Url = "http://service2";
    if (getRandomNumber(0, 1) > 0.7) {
        service2Url = "http://service2/slowapi";
    }

    // Call service2
    request({
        uri: service2Url,
        headers: contextful.from(req)
    }, function (error, res, body) {
        var service2Response = body;

        // Call service4
        request({
            uri: 'http://service4',
            headers: contextful.from(req)
        }, function(error, res, body) {
            var service4Response = body;
            console.log("Request " + req.httpVersion + " " + req.method + " " + req.url);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("HELLO from service 1 and " + service2Response + " and " + service4Response + " \n");
        });
    });

    // req.get(service2Url, function(err, res, body) {
    //     var service2Response = body;
    //     req.get('http://service4', function(err, res, body) {
    //         var service4Response = body;
    //         console.log("Request " + request.httpVersion + " " + request.method + " " + request.url);
    //         response.writeHead(200, { "Content-Type": "text/plain" });
    //         response.end("Hello from service 1 and " + service2Response + " and " + service4Response + " \n");
    //     });
    // });
});

server.listen(80, function () {
    console.log("Server running at http://127.0.0.1:80/");
});

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}