const http = require('http');
const fs = require('fs').promises
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    fs.writeFile(__dirname + '/headers2.txt', JSON.stringify(req.headers, null, 4)).then(function () {
        res.end('ok');
    });
});



server.listen(3000);