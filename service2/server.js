var request = require('request');
var morgan = require('morgan');
var express = require('express');
var contextful = require('./contextful');

var app = express();
app.use(morgan("dev"));

// application -------------------------------------------------------------
app.get('/', function (req, response) {
    response.send("hello from service 2");
});

app.get('/reserve', function (req, response) {
    request({
        uri: 'http://service3/lookupitem',
        headers: contextful.from(req)
    }, function (error, res, body) {
        if (res.statusCode != 200) {
            console.log('aaa');
            response.status(500).send("Sorry, something went wrong");
            return;
        }
        response.send("Making reservation and " + body);
    });

    // request.get('http://service3', function(err, res, body) {
    //     response.send("Hello from service 2 and " + body);
    // });
});

// api ------------------------------------------------------------
app.get('/slowapi', function (req, res) {
    setTimeout(function() {
        res.send("Hello from slow api");
    }, 1000);
});

var port = 80;
var server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});

process.on("SIGINT", () => {
    process.exit(130 /* 128 + SIGINT */);
});

process.on("SIGTERM", () => {
    console.log("Terminating...");
    server.close();
});