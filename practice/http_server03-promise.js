const http = require('http');
const fs = require('fs');

function myReadFile(file_path) {
    return new Promise((resolve, reject) => {
        fs.readFile(file_path, (error, data) => {
            //error錯誤先行
            if (error) return reject(error);
            resolve(data);
        });
    })
}
const server = http.createServer(async (req, res) => {
    const data = await myReadFile(__dirname + '/headers.txt');
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(data);
});


fs.readFile(__dirname + '/headers.txt', (error, data) => {
    //error錯誤先行
    if (error) {
        console.log(error);
        res.end("錯誤");
    } else {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });
        res.end(data);
    }
});



server.listen(3000);