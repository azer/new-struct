## new-struct

Structs inspired from Golang

```js
newStruct = require('new-struct')

Animal = newStruct({
  name: '',
  type: '',
  age: 0,
  run: run
})

function run (animal) {
  console.log('%s is running', animal.name)
}

dongdong = Animal('dongdong', 'cat', 4)
blackbear = Animal('blackbear', 'cat', 3)

dongdong.run()
// => dongdong is running

blackbear.run()
// => blackbear is running
```

## Install

```bash
$ npm install new-struct
```

## Usage

You can pass the values as an object, too;

```js
dongdong = Animal({ type: 'cat', foobar: 'dfjh' })
```

Methods can also be defined later;

```js
Animal.method('jump', function(animal){
  console.log('%s is jumping!!', animal.name)
})
```

To extend an existing struct:

```js
Cat = Animal.extend({
  type: 'cat',
  grrr: grrr
})

function grrr(cat) {
  console.log('grrrrrr')
}

dongdong = Cat('dongdong', 2) // notice how 'type' property got eleminated from parameter order.
```

To define a constructor method:

```js
Animal = newStruct({
  construct: construct,
  name: '',
  type: '',
  age: 0,
  run: run
})

function construct (animal) {
  animal.log = console.log
  animal.log('%s just born!', animal.name)
}

dondong = Animal('dongdong', 'cat')
// => dongdong just born
```

![](http://i.cloudup.com/CZR70W5Sct.png)
