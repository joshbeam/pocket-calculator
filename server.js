var express = require('express'),
	app = express(),
	port = process.env.PORT || 5000;

app.use(express.static('app/dist'));
app.use(express.static('app/templates'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/index.html');
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});