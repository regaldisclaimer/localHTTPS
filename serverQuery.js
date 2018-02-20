//attempted to allow serving contents above the directory of this server
//the initial index.html can be accessed with query, but all the imports will not work, as they are not correctly formatted
//upper directory access with normal ../ pattern is not accepted by browsers, so this file and attempt is scrapped.

var https = require('https');
var fs = require('fs');
var path = require('path');
var url = require('url');

var server = https.createServer ({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
}, function(req, res) {
	// var parse = url.parse(req.url);
	// if (parse.query) {
	// 	var filePath = '.' + decodeURIComponent(url.parse(req.url, true).query.addr);	
	// } else {
	// 	var filePath = '.' + req.url;
	// }

	var filePath = '.' + url.parse(req.url).pathname;
	console.log(filePath);
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
