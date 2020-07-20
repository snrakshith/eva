/**
 * Eva Interpreter
 */
const assert = require("assert");

class Eva {
  eval(exp) {
    if (isNumber(exp)) {
      return exp;
    }
    if (isString(exp)) {
      return exp.slice(1, -1);
    }
    if (exp[0] === "+") {
      return this.eval(exp[1]) + this.eval(exp[2]);
    }
    throw "Unimplemented";
  }
}

let isNumber = (exp) => {
  return typeof exp === "number";
};

let isString = (exp) => {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
};
// Initalised
const eva = new Eva();

// -------------------------
// Tests
assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval(["+", 5, 5]), 10);
// assert.strictEqual(eva.eval(['+', ['+', 5, 5], 5]), 15);
assert.strictEqual(eva.eval('"hello"'), "hello");

// Incase of all Tests Pass

console.log("All Assertions Passed");
