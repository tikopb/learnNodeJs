// console.log(arguments);
// console.log((require("module").wrapper));

const C = require('./test-module-1');
const calc = new C();
console.log(calc.add(5,6));