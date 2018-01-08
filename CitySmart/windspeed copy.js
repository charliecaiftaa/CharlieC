$(document).ready(function () {



    var myJSON = 0;
    var URL = 'windspeed.json';
    var oReq = new XMLHttpRequest();
    var result = [];

    oReq.addEventListener("load", reqListener);
    oReq.open("GET", URL);
    oReq.send();

   var data = [];

    

function reqListener () {
    //console.log(this.responseText);
    myJSON = this.responseText;

    var myObj = JSON.parse(myJSON);

    var i = 0;
    var time_stamp = [];
    var wind_speed = [];



data = [];
    for (i = 0; i < myObj.results[0].series[0].values.length ; i++) {
        time_stamp = (myObj.results[0].series[0].values[i][0]);
        wind_speed = (myObj.results[0].series[0].values[i][1]);
        data.push([new Date(time_stamp),wind_speed]);
        //console.log(data);
        //console.log(time_stamp);
        //console.log(wind_speed);


        //result.push(myObj.results[0].series[0].values[i][j]);

    }

        //var xmin = 0;
        //var xmax = 0;
        var path = URL;
        var title = "Windspeed";


        var windSpeed = new Dygraph(document.getElementById("windspeed"), data,
            {
                drawPoints: true,
                showRoller: true,
                title: title,
                labels: ['TimeStamp', 'Windspeed'],
                showRangeSelector: true,
                //rangeSelectorHeight: 100,
                //valueRange: [xmin, xmax],
                rangeSelectorPlotStrokeColor: 'black',
                rangeSelectorPlotFillColor: 'lightblue'
            });

setInterval(function() { oReq.addEventListener("load", reqListener);oReq.open("GET", URL);oReq.send(); windSpeed.updateOptions( { 'file': data } ); },10000);



}  






});
