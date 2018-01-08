/**
 * Created by imacbig04 on 7/18/17.
 */
var express = require('express');
var app = express();
var Influx = require('influx');

// Connect to a single host with a full set of config details and
// a custom schema
var client = new Influx.InfluxDB({
    database: 'db_name',
    host: 'aworldbridgelabs.com',
    port: 8086,
    username: 'trueman',
    password: 'TruemanWu!04',
    schema: [
        {
            measurement: 'Budget_Final',
            fields: {
                Electricity_Usage: Influx.FieldType.FLOAT
            },
            tags: [
                'Machine_ID'
            ]
        }
    ]
});

app.get('/graph', function (req, res) {
    client.query('select sum(Electricity_Usage) as Electricity_Usage from "db_name"."autogen"."Budget_Final" where time >= 1473120000000000000 and time <= 1504652400000000000 group by time(1h)').then(results => {
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