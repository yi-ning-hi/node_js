class Person{
    constructor(name="noname",age=0){
        this.name = name;
        this.age = age;
    }
    
    toJSON(){
        return{
            name:this.name,
            age:this.age

        }
    }
    sayHello(){
        return `Hello ${this.name}`;
    }
}
console.log("preson.js");

const f3 = a => a*a*a;

module.exports = {Person,f3};

// const p1 = new Person("Bill",23);

// console.log(p1.sayHello());
// console.log(JSON.stringify(p1));
// console.log(JSON.stringify(p1.toJSON()));