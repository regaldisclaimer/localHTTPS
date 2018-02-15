var https = require('https');
var fs = require('fs');
var path = require('path');

var server = https.createServer ({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
}, function(req, res) {
	var filePath = '.' + req.url;

	var extension = path.extname(filePath);
	var contentType = '';

	switch (extension) {
		case 'html':
			contentType = 'text/html';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 
	}
});

server.listen(8888);
console.log("Serving local contents at https://localhost:8888");

////////////////////////////

