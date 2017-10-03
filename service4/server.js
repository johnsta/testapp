var morgan = require('morgan');
var express = require('express');

var app = express();
app.use(morgan("dev"));


app.get('/', function (req, response) {
    response.send("Hello from service 4");
});

app.get('/sendconfirmation', function (req, response) {
    response.send("reservation confirmation sent");
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