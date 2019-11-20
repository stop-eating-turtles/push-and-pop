////////////////////////////////////////////////////////////////////////////////

/* An object with no prototype works fine as a string-value map even if
  someone messed with `Object.prototype` (a BAd idea).
*/
const nullObject = object => Object.assign(Object.create (null), object);

module.exports = (defaults) => {
  const scope = nullObject(defaults);

  const backtrackInstructions = [];
  return {
    push (newProps) {
      const backtracking = nullObject();
      Object.entries(newProps).forEach(([key, value]) => {

        const oldValue = scope[key];
        if (value !== oldValue) {
          backtracking[key] = oldValue;
          scope[key] = value;
        }
      });
      backtrackInstructions.push(backtracking);
    },
    pop (times = 1) {
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