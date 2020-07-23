const assert = require("assert");
const Environment = require("./Environment");

/**
 * Eva Interpreter
 */
class Eva {
  /**
   * Create an Eva instance with the global environment.
   */
  constructor(global = new Environment()) {
    this.global = global;
  }
  /**
   * Evaluates an expression in the given environment
   */
  eval(exp, env = this.global) {
    // -------------------------
    // Self-evaluating expressions
    if (isNumber(exp)) {
      return exp;
    }
    if (isString(exp)) {
      return exp.slice(1, -1);
    }
    // --------------------------
    // Math Opertion
    if (exp[0] === "+") {
      return this.eval(exp[1]) + this.eval(exp[2]);
    }
    if (exp[0] === "-") {
      return this.eval(exp[1]) - this.eval(exp[2]);
    }
    if (exp[0] === "*") {
      return this.eval(exp[1]) * this.eval(exp[2]);
    }
    if (exp[0] === "/") {
      return this.eval(exp[1]) / this.eval(exp[2]);
    }
    // --------------------------
    // Variable Declaration
    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value));
    }
    // -------------------------
    // Variable Access
    if (isVariableName(exp)) {
      return env.lookup(exp);
    }
    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }
}

let isNumber = (exp) => {
  return typeof exp === "number";
};

let isString = (exp) => {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
};

function isVariableName(exp) {
  return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}
// Initalise with a pre-installed `varibales`
const eva = new Eva(
  new Environment({
    null: null,
    true: true,
    false: false,
    Version: "0.1",
  })
);

// -------------------------
// Tests
assert.strictEqual(eva.eval(1), 1);

// Math
assert.strictEqual(eva.eval(["+", 5, 5]), 10);
assert.strictEqual(eva.eval(["-", 7, 5]), 2);
assert.strictEqual(eva.eval(["*", 5, 5]), 25);
assert.strictEqual(eva.eval(["/", 5, 5]), 1);
assert.strictEqual(eva.eval(["+", ["+", 5, 5], 5]), 15);
// String
assert.strictEqual(eva.eval('"hello"'), "hello");
// Variable (Explict)
assert.strictEqual(eva.eval(["var", "x", 10]), 10);
assert.strictEqual(eva.eval("x"), 10);
// Variable (Builtin)
assert.strictEqual(eva.eval("Version"), "0.1");
// var isUser = true
assert.strictEqual(eva.eval(["var", "isUser", "true"]), true);
assert.strictEqual(eva.eval(["var", "z", ["+", 2, 2]]), 4);
assert.strictEqual(eva.eval("z"), 4);

// Incase of all Tests Pass

console.log("All Assertions Passed");
