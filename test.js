const {
  scope: settings,
  push,
  pop
} = require ("./index.js") ({
  angleMode: "radians"
});

const cosine = (n) => {
  switch (settings.angleMode) {
    case "degrees": return Math.cos(n * Math.PI / 180);
    case "radians": return Math.cos(n);
    default: throw Error("settings.angleMode must be degrees or radians");
  }
}

const {deepStrictEqual: equal} = require ("assert");

equal(cosine(Math.PI * 2), 1);
push({angleMode: "degrees"});
equal(cosine(360), 1);
pop();
equal(cosine(Math.PI * 2), 1);