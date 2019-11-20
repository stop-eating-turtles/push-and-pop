# push-and-pop
Scoping the easy way.

## Installation
```
$ npm install push-and-pop
```

## Usage
```js
const {scope: settings, push, pop} = require("./index.js")({
  angleMode: "radians"
});

const cosine = (n) => {
  switch (settings.angleMode) {
    case "degrees": return Math.cos(n * Math.PI / 180);
    case "radians": return Math.cos(n);
    default: throw Error("settings.angleMode must be degrees or radians");
  }
};

const {deepStrictEqual: equal} = require("assert");

cosine(Math.PI * 2); // 1

// Change the settings...
push({angleMode: "degrees"});
cosine(360); // 1

// ...And change them back.
pop();
```

## API
**require("push-and-pop")(properties = {})**
Create an object `p` containing `scope`, `push`, and `pop` The scope is a null object, so it doesn't have methods like `toString`.

**p.scope**
An object with `properties` from a call to `require("push-and-pop")`.

**p.push(properties = {})**
Add properties to a `scope` that can be `pop`ped off later.

**p.pop(times = 1)**
Pop a layer off the scope zero or more `times`.