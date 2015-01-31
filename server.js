var express = require('express');
var request = require('request');
var fs =      require('fs');

var app = express()
app.set('view engine', 'jade');

var content = "";

//API example routes below - Keep ordering Alphabetical

app.get('/api/example', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
  	request.get('https://trading.iii.co.uk/papi/v1/prices/quote/id/LSE:SOLO?livedata=1', function (error, response, body) {
      if (!error && response.statusCode == 200) {
	        var content = body;
  			res.send(content);
	    } else {
        res.send(JSON.stringify({"error": "Error reading file"}));
      }
	});
})

app.get('/api/test', function(req, res){
    fs.readFile(__dirname + '/json/test.json', 'utf8', function (err, data) {
        var content = data;
        console.log(err);
        res.send(content);
    });
});

app.get('/', function (req, res) {
  	res.render('index', { title: 'UX Mock API list', message: 'UX Mocking APIs'});  	
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Listening at http://%s:%s', host, port)
})