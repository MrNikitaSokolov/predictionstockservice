/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// for initiating HTTP request
var rp = require('request-promise');

// create a new express server
var app = express();

// use hbs as the view template
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var marketDataHost = 'https://stockmasterdata.mybluemix.net/company/';

// ROUTES
app.get('/', function(req, res){
    rp({ uri: marketDataHost, json: true })
        .then(function (data) {
            res.render('index', {companyList: data});
        })
        .catch(function (err) {
            console.log(err);
        });
});

app.get('/status', function(req, res){
    res.send({
        name: 'Stock Market Prediction',
        description: 'Stock market prediction is a service that help investor(s) to determine the future value of a company stock.'
    });
});


app.get('/getdata/:companyName', function(req, res){
    var company = req.params.companyName;
    rp({ uri: marketDataHost + company, json: true })
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            console.log(err);
        });
});

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});