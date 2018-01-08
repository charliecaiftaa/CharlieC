/**
 * Created by imacbig04 on 7/13/17.
 */
var express = require('express');
var app = express();
var mysql = require('mysql');

//var pool = mysql.createPool({
var connection = mysql.createConnection({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'Trueman',
    password: 'TruemanWu!04',
    database: 'FTAA_Energy_Budget',
});

app.get('/graph', function (req, res) {
    connection.query('Select Dates, Sum(Electricity_Usage) As Electricity_Usage From Final Group By Dates;', function (err, results, fields) {
        if (err) throw err;
        var origin = req.headers.origin;
        res.setHeader("Access-Control-Allow-Origin", origin);

        var JSONresult = JSON.stringify(results, null, "\t");
        console.log(JSONresult);

        res.send(JSONresult);
        res.end();
    });
});

var server = app.listen(9084, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});