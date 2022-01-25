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
console.log("preson.mjs");

export const f3 = a => a*a*a;
const f1 = a => a*a;
export {f1};
export default Person;
//export default 只能用一個
