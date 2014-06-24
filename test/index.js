var test = require('prova');
var Struct = require('../');
var fixtures = require("./fixtures");

test('mixes methods and objects', function (t) {
  var a = fixtures.Animal({
    name: 'foo',
    kind: 'cat',
    age: 3,
    out: out
  });

  a.intro();

  function out (text) {
    t.equal(text, 'foo: foo is a 3 year(s) old cat');
    t.end();
  }
});

test("doesn't support constructors. constructor-like factory functions are easy.", function (t) {

  var a = fixtures.Animal.New('foo', 'cat', 3, aOut);
  var b = fixtures.Animal.New('dong dong', undefined, undefined, bOut);

  a.intro();
  b.intro();

  var calledA;

  function aOut (text) {
    t.equal(text, 'foo: foo is a 3 year(s) old cat');
    calledA = true;
  }

  function bOut (text) {
    t.equal(text, 'dong dong: dong dong is a 20 year(s) old cat');
    t.ok(calledA);
    t.end();
  }

});

test('supports embedding', function (t) {

  var dong = fixtures.Cat.New('dong dong', 14, out);

  var messages = [
    'dong dong => dong dong is a lazy 14 year(s) old cat',
    'dong dong => ...very sleepy',
    'dong dong => meoooowww',
    'dong dong => sleeeeeppp',
    'dong dong => run run run'
  ];

  var i = 0;

  t.equal(dong.power, 30);
  dong.intro();
  t.equal(dong.power, 27);
  dong.sleepy();
  t.equal(dong.power, 7);
  dong.meow();
  t.equal(dong.power, 5);
  dong.sleep();
  t.equal(dong.power, 14);
  dong.run();
  t.equal(dong.power, 8);

  function out (text) {
    t.equal(messages[i], text);
    if (i == 4) t.end();
    i++;
  }

});

test('supports nested objects', function (t) {
  var p1 = fixtures.Plain({
    a: 0,
    b: 2,
    c: 3,
    foo: {
      bar: 123,
      qux: 456
    },
    corge: {
      no: 789,
      pe: 101
    }
  });

  var p2 = fixtures.Plain({
    a: 9,
    b: 8,
    c: 7,
    foo: {
      bar: 987,
      qux: 654
    },
    corge: {
      no: 321,
      pe: 011
    }
  });

  var p3 = fixtures.Plain({
    a: { a: true },
    b: { b: true },
    c: { c: true },
    foo: 'bar',
    corge: 'qux'
  });

  t.equal(p1.a, 0);
  t.equal(p1.b, 2);
  t.equal(p1.c, 3);
  t.deepEqual(p1.foo, {
    bar: 123,
    qux: 456
  });

  t.deepEqual(p1.corge, {
    no: 789,
    pe: 101
  });

  t.equal(p2.a, 9);
  t.equal(p2.b, 8);
  t.equal(p2.c, 7);
  t.deepEqual(p2.foo, {
    bar: 987,
    qux: 654
  });

  t.deepEqual(p2.corge, {
    no: 321,
    pe: 011
  });

  t.deepEqual(p3.a, { a: true});
  t.deepEqual(p3.b, { b: true});
  t.deepEqual(p3.c, { c: true});
  t.equal(p3.foo, 'bar');
  t.equal(p3.corge, 'qux');

  t.end();
});
