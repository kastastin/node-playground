console.log(arguments);
console.log(require("module").wrapper);

const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(5, 5));

const calc2 = require("./test-module-2");
console.log(calc2.add(50, 50));

const { add, multiply } = require("./test-module-2");
console.log(multiply(5, 5));

// Caching
require("./test-module-3")();
require("./test-module-3")();