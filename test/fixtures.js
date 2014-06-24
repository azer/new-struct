var Struct = require("../");

var Animal = exports.Animal = Struct({
  New: NewAnimal,
  intro: intro,
  speak: speak,
  run: run
});

function NewAnimal (name, kind, age, out) {
  return exports.Animal({
    name: name,
    kind: kind || 'cat',
    age: age || 20,
    out: out,
    power: 20
  });
}

function intro (animal, text) {
  animal.speak(text || (animal.name + ' is a ' + animal.age + ' year(s) old ' + animal.kind));
  animal.power -= 2;
}

function speak (animal, text, separator) {
  animal.out(animal.name + (separator || ': ') + text);
  animal.power -= 1;
}

function run (animal) {
  animal.speak('run run run');
  animal.power -= 5;
}

var Sleepy = exports.Sleepy = Struct({
  sleepy: sleepy
});

function sleepy (sleepy) {
  sleepy.speak('...very sleepy');
  sleepy.power = 7;
}

var Lazy = exports.Lazy = Struct(Sleepy, {
  sleep: sleep
});

function sleep (lazy) {
  lazy.speak('sleeeeeppp');
  lazy.power += 10;
}

exports.Cat = Struct(Animal, Lazy, {
  New: New,
  intro: catIntro,
  meow: meow,
  sleep: sleep,
  speak: catSpeak
});

function New (name, age, out) {
  return exports.Cat({ name: name, kind: 'cat', age: age, power: 30, out: out });
}

function catSpeak (cat, text) {
  Animal.methods.speak(cat, text, ' => ');
}

function catIntro (cat) {
  Animal.methods.intro(cat,
                   cat.name
                   + ' is a lazy '
                   + cat.age
                   + ' year(s) old '
                   + cat.kind);
}

function meow (cat) {
  cat.speak('meoooowww');
  cat.power -= 1;
}

var Plain = exports.Plain = Struct({
  New: function (options) {
    return exports.Plain(options);
  }
});
