const devMode = typeof process !== "undefined"
  && process.env
  && process.env.NODE_ENV === "development";

/* An object with no prototype works fine as a string-value map even if
  someone messed with `Object.prototype` (a BAd idea).
*/
const nullObject = object => Object.assign(Object.create (null), object);

module.exports = (properties = {}) => {
  const scope = nullObject();
  const propertyKeys = Reflect.ownKeys(properties);
  for (let i = 0; i < propertyKeys.length; i++) {
    const key = propertyKeys[i];
    const property = Object.getOwnPropertyDescriptor(properties, key);
    if(property.get) property.get = property.get.bind(scope);
    if(property.set) property.set = property.set.bind(scope);
    Object.defineProperty(scope, key, property);
  }

  const result = {
    push (properties = {}) {
      const backtrack = {};
      const entries = Object.entries(properties);
      if (entries.length !== 0) {
        entries.forEach(([key, value]) => {
          const oldValue = scope[key];
          if (value !== oldValue) {
            backtrack[key] = oldValue;
            scope[key] = value;
          }
        });
      }
      this.backtrackInstructions.push(backtrack);

      return scope;
    },
    pop (times = 1) {
      if (devMode) {
        if (times !== Math.round(times)) throw Error("Expected an integer");
        if (times < 0) throw Error("Expected a positive number");
      }

      let i = times;
      while (i --> 0) {
        Object.assign (scope, this.backtrackInstructions.pop());
      }

      return scope;
    },
    scope,
    backtrackInstructions: []
  };

  const {push, pop} = result;
  result.push = push.bind(result);
  result.pop = pop.bind(result);

  return result;
};

// If this script is being run directly, run tests.
if (!module.parent) require("./test.js");