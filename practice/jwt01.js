const jwt = require('jsonwebtoken');

const t = jwt.sign({name:'david'},'aaaaaa');
console.log(t);
console.log(jwt.verify(t,'aaaaaa'));