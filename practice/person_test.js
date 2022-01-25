const obj = require("./person");

const {Person} = require("./person");
const {f3} = require("./person");
//展開設定

const p2 = new obj.Person("Peter",24);
const p3 = new Person("David",30);
// console.log(JSON.stringify(p2.toJSON()));
// console.log(JSON.stringify(p2));
console.log({Person});
console.log({f3});
console.log(p2);
console.log(obj.f3(3));
console.log(f3(5));
console.log(p3);
console.log(obj.Person === Person);
console.log(obj.f3 === f3);
