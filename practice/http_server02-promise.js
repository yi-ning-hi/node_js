const http = require('http');
const fs = require('fs');


function myWriteFile(file_path){
    return new Promise((resolve,reject)=>{
        fs.writeFile(file_path, JSON.stringify(req.headers, null, 4), error => {
            if (error) return reject(error);
            resolve();
        });
    })
}
const server = http.createServer(async(req, res)=>{ 
    const data = await myWriteFile(__dirname+'/headers.txt')
        
    });
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
});



server.listen(3000);
