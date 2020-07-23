/**
 * Environment : Name Storage
 */

class Environment {
  /**
   * Create an Environmnet with the given record..
   */
  constructor(record = {}) {
    // A variable which is used as a storage
    this.record = record;
  }
  // Create a variable with name and value..
  define(name, value) {
    this.record[name] = value;
    return value;
  }
  /**
   * Returns the value of a defined variable or
   * throw if the vairable is not defined.
   */
  lookup(name) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`Variable "${name}" is not defined `);
    }
    return this.record[name];
  }
}

module.exports = Environment;
