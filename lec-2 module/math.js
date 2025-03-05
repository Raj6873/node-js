const  Module  = require("module");

console.log("hello I'm js");

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

// Module.exports =add;
// Module.exports =sub;

console.log(add(10, 40));
console.log(sub(10, 20));