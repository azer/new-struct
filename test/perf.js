var fixtures = require("./fixtures");

it('creates simple structs', function(){
  var foo = fixtures.Animal({
    name: 'foo',
    kind: 'cat',
    age: 3
  });
});

it('creates via factory-like functions', function(){
  var foo = fixtures.NewAnimal('foo', 'cat', 3);
});

it('creates a struct that embeds another', function(){
  var foo = fixtures.Lazy({
    name: 'foo',
    kind: 'cat'
  });
});

it('creates a struct that embeds multiple structs', function(){
  var foo = fixtures.Cat({
    name: 'foo',
    kind: 'cat'
  });
});
