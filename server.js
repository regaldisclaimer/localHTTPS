var https = require('https');
var fs = require('fs');
var server = https.createServer ({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem'),
});

server.listen(8888);
console.log("Serving local contents at https://localhost:8888");