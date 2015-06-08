var express = require('express'),
	app = express(),
	port = process.env.PORT || 5000;

process.env.PWD = process.cwd();

app.use('/public', express.static(process.env.PWD + '/app/dist/'));
app.use('/templates', express.static(process.env.PWD + '/app/templates/'));

app.get('/', function(req, res) {
	res.sendFile(process.env.PWD + '/app/index.html');
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});