const jwt = require('jsonwebtoken');
const key = 'jkjdkfsd9ewer48475';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjEsI…DI2fQ.ceLNHjfsgO5M181X2KNK2ZbNsuLlhB-3XIEm4H1vuSM';
let oriData;
try{
    oriData = jwt.verify(token,key,value);
} catch(ex){
    console.log({ex});
}

console.log(oriData);