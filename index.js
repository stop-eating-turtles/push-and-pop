////////////////////////////////////////////////////////////////////////////////

const devMode = typeof process !== "undefined"
  && process.env
  && process.env.NODE_ENV === "development";

/* An object with no prototype works fine as a string-value map even if
  someone messed with `Object.prototype` (a BAd idea).
*/
const nullObject = object => Object.assign(Object.create (null), object);

module.exports = (properties = {}) => {
  const scope = nullObject(properties);

  const backtrackInstructions = [];
  return {
    push (properties = {}) {
      const backtracking = {};
      const entries = Object.entries(properties);
      if (entries.length !== 0) {
        entries.forEach(([key, value]) => {
          const oldValue = scope[key];
          if (value !== oldValue) {
            backtracking[key] = oldValue;
            scope[key] = value;
          }
        });
      }
      backtrackInstructions.push(backtracking);
    },
    pop (times = 1) {
      if (devMode) {
        if (times !== Math.round(times)) throw Error("Expected an integer");
        if (times < 0) throw Error("Expected a positive number");
      }

      let i = times;
      while (i --> 0) {
        Object.assign (scope, backtrackInstructions.pop());
      }
    },
    scope
  }
};

// If this script is being run directly, run tests.
if (!module.parent) require ("./test.js");