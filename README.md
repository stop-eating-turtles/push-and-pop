# push-and-pop
Scoping the easy way.

## Installation
```
$ npm install push-and-pop
```

## Usage
```js
const pushAndPop = require ("./index.js");

const {scope: settings, push, pop, backtrackInstructions} = pushAndPop ({
  angleMode: "radians",

  // This bit would be rather silly in real code. ¯\_(ツ)_/¯
  set radiansMode (bool) {
    if (bool) this.angleMode = "radians";
    else inRadiansMode = bool;
  },
  get radiansMode () {
    return this.angleMode === "radians";
  }
});

const cosine = (n) => {
  switch (settings.angleMode) {
    case "degrees": return Math.cos(n * Math.PI / 180);
    case "radians": return Math.cos(n);
    default: throw Error("settings.angleMode must be degrees or radians");
  }
};

const {deepStrictEqual: equal} = require ("assert");

cosine(Math.PI * 2) // 1

push({radiansMode: false}) // {angleMode: "degrees", radiansMode: false, backtrackInstructions: []}
cosine(360) // 1
backtrackInstructions // [{radiansMode: true}]

pop(); // {angleMode: "radians", radiansMode: true}
cosine(Math.PI * 2) // 1
```

## API

### `require("push-and-pop")(properties = {})`
Create an object `p` containing `scope`, `push`, and `pop` The scope is a null object, so it doesn't have methods like `toString`.

### `p.scope`
An object with `properties` from a call to `require("push-and-pop")`.

### `p.push(properties = {})`
Add properties to a `scope` that can be `pop`ped off later. Returns the new `scope`.

### `p.pop(times = 1)`
Pop a layer off the scope zero or more `times`. Returns the new `scope`.

### `p.backtrackInstructions`
An array of objects that show the changes needed to make `scope` go back a layer.