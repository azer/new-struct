## new-struct

A minimalistic class system designed for flexibility, functional programming. Inspired from Golang's Struct concept.

Motivation:

* `new-struct` is small and simple. All it does is composing functions and objects.
* It doesn't have `new` and `this` keywords. So, you'll never have to fix scopes.
* You can do currying, partial programming with both `new-struct` and structs.

How does a struct look?

```js
var Struct = require('new-struct')

var Animal = Struct({
  sleep: sleep,
  speak: speak
})

module.exports = Animal;

function sleep (animal) { console.log('zzzz'); }

function speak (animal, text) { 
  console.log('%s says %s', animal.name, text);
}
```

Check out [Usage](#usage) and examples for more info about it.

## Install

```bash
$ npm install new-struct
```

## Usage

A new struct is defined by an object of methods:

```js
Struct = require('new-struct')

Animal = Struct({
  sleep: sleep,
  run: run,
  speak: speak
})

function sleep (animal) {
  console.log('zzz');
}

function speak (animal, sound) {
  console.log('%s says %s', animal.name, sound)
}

function run (animal) {
  console.log('%s is running', animal.name)
}
```

To create a an instance of the `Animal` struct, just call it with an object.
`this` and `new` keywords are not needed, everything is just functions.

```
dongdong = Animal({ name: 'dongdong' })
blackbear = Animal({ name: 'blackbear' })

dongdong.name
// => 'dong dong'

dongdong.run()
// dongdong is running

blackbear.sleep()
// blackbear is sleeping
```

### Factory Functions

It doesn't support constructors, but constructor-like factory functions are easy to implement:

```js
function NewAnimal (name, age) {
  return Animal({ name: name, age: age })
}
```

Note that you can attach your constructor as a static method. So, you could have such a module:

```js
Animal = Struct({
  New: New,
  run: run,
  speak: speak
})

module.exports = Animal;

function New (name, age) {
  return Animal({ name: name, age: age })
}

function speak (animal, sound) {
  console.log('%s says %s', animal.name, sound)
}

function run (animal) {
  console.log('%s is running', animal.name)
}
```

This will allow other modules requiring this have more flexibility:

```js
Animal = require('./animal')

// You can either create using constructor:
Animal.New('dong dong', 13)

// Or calling the constructor itself:
Animal({ name: 'dong dong', age: 13 })

// You can also access the methods of Animal:
Animal.methods.run({ name: 'black bear' })
// will output: black bear is running
```

### Mixing

You can create structs that mixes other ones:

```js
Animal = require('./animal')

Cat = Struct(Animal, {
  meow: meow
})

function meow (cat) {
  Animal.methods.speak(cat, 'meooww')
}
```

Notice that each struct has a property called `methods` that keeps all the functions passed to it, including the ones derived from other structs.

See the tests and examples for more info, or create issues & send pull requests to improve the documentation.

![](http://i.cloudup.com/CZR70W5Sct.png)
