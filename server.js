var https = require('https');
var fs = require('fs');
var path = require('path');

var server = https.createServer ({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
}, function(req, res) {
	var filePath = '.' + req.url;

	if (filePath == './') {
		filePath = './index.html';
	}

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
			contentType = 'applicaiton/json';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.jpg':
			contentType = 'image/jpg';
			break;
		case '.ico':
			contentType = 'image/x-icon';
			break;
		case '.pdf':
			contentType = 'application/pdf'
			break;
	}

	fs.readFile(filePath, function (error, content) {
		if (error) {
			if (error.code == 'ENOENT') {
				res.writeHead(404);
				res.end('404 Error: ' + error.code + ' ..\n');
				res.end();
			}
		} else {
			res.writeHead(200, {
				'Content-Type': contentType
			});
			res.end(content, 'utf-8');
		}
	});
});

server.listen(8888);
console.log("Serving local contents at https://localhost:8888");
