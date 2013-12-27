var Struct = require('../');
var fixtures = require("./fixtures");

it('mixes methods and objects', function(done){
  var a = fixtures.Animal({
    name: 'foo',
    kind: 'cat',
    age: 3,
    out: out
  });

  a.intro();

  function out (text) {
    expect(text).to.equal('foo: foo is a 3 year(s) old cat');
    done();
  }
});

it("doesn't support constructors. constructor-like factory functions are easy.", function(done){

  var a = fixtures.Animal.New('foo', 'cat', 3, aOut);
  var b = fixtures.Animal.New('dong dong', undefined, undefined, bOut);

  a.intro();
  b.intro();

  var calledA;

  function aOut (text) {
    expect(text).to.equal('foo: foo is a 3 year(s) old cat');
    calledA = true;
  }

  function bOut (text) {
    expect(text).to.equal('dong dong: dong dong is a 20 year(s) old cat');
    expect(calledA).to.be.true;
    console.log('doneee');
    done();
  }

});

it('supports embedding', function(done){

  var dong = fixtures.Cat.New('dong dong', 14, out);

  var messages = [
    'dong dong => dong dong is a lazy 14 year(s) old cat',
    'dong dong => ...very sleepy',
    'dong dong => meoooowww',
    'dong dong => sleeeeeppp',
    'dong dong => run run run'
  ];

  var i = 0;

  expect(dong.power).to.be.equal(30);
  dong.intro();
  expect(dong.power).to.be.equal(27);
  dong.sleepy();
  expect(dong.power).to.be.equal(7);
  dong.meow();
  expect(dong.power).to.be.equal(5);
  dong.sleep();
  expect(dong.power).to.be.equal(14);
  dong.run();
  expect(dong.power).to.be.equal(8);

  function out (text) {
    expect(messages[i]).to.equal(text);
    if (i == 4) done();
    i++;
  }

});

