const pushAndPop = require ("./index.js");

const {scope: settings, push, pop} = pushAndPop ({
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

equal(cosine(Math.PI * 2), 1);

push({angleMode: "degrees"});
equal(cosine(360), 1);

push({radiansMode: true});

equal(settings.radiansMode, true);
equal(settings.angleMode, "radians");
equal(cosine(Math.PI * 2), 1);

pop(2);
equal(cosine(Math.PI * 2), 1);