var express = require('express'),
	app = express(),
	favicon = require('serve-favicon'),
	path = require('path'),
	port = process.env.PORT || 5001;

process.env.PWD = process.cwd();

app.use(favicon(path.join(process.env.PWD,'app','dist','images','favicon.ico')));
app.use('/public', express.static(process.env.PWD + '/app/dist/'));
app.use('/templates', express.static(process.env.PWD + '/app/templates/'));

app.get('/', function(req, res) {
	res.sendFile(process.env.PWD + '/app/index.html');
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});