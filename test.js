var newStruct = require('./');

it('returns copies of defined struct', function(){

  var Animal = newStruct({
    name: 'cuttie',
    age: 1
  });

  var a = Animal('foo', 2),
      b = Animal('bar', 3),
      c = Animal();

  expect(a.name).to.equal('foo');
  expect(b.name).to.equal('bar');
  expect(a.age).to.equal(2);
  expect(b.age).to.equal(3);
  expect(c.name).to.equal('cuttie');
  expect(c.age).to.equal(1);

});

it('allows passing params as object', function(){

  var Animal = newStruct({
    name: '',
    age: 0
  });

  var a = Animal({ name: 'foo', age: 2 }),
      b = Animal({ name: 'bar', age: 3 });

  expect(a.name).to.equal('foo');
  expect(b.name).to.equal('bar');
  expect(a.age).to.equal(2);
  expect(b.age).to.equal(3);

});

it('wraps methods to pass the struct as first parameter', function(){

  var Animal = newStruct({
    name: '',
    age: 0,
    run: run,
    say: say
  });

  var calledRun, calledSay;

  function run (animal) {
    animal.calledRun = true;
    return animal;
  }

  function say (animal, p1, p2, p3) {
    animal.calledSay = true;
    expect(p1).to.equal('p1');
    expect(p2).to.equal('p2');
    expect(p3).to.equal('p3');
    return animal;
  }

  var a = Animal({ name: 'foo', age: 2 }),
      b = Animal({ name: 'bar', age: 3 });

  expect(a.name).to.equal('foo');
  expect(b.name).to.equal('bar');
  expect(a.age).to.equal(2);
  expect(b.age).to.equal(3);

  expect(a.run()).to.equal(a);
  expect(a.say('p1', 'p2', 'p3')).to.equal(a);
  expect(a.calledRun).to.be.true;
  expect(a.calledSay).to.be.true;

  expect(b.run()).to.equal(b);
  expect(b.say('p1', 'p2', 'p3')).to.equal(b);
  expect(b.calledRun).to.be.true;
  expect(b.calledSay).to.be.true;

});

it('allows defining methods first', function(){
  var Animal = newStruct({
    name: '',
    run: run,
    say: say,
    age: 0
  });

  function run(){}
  function say(){}

  var a = Animal('foo', 2),
      b = Animal('bar', 3);


  expect(a.name).to.equal('foo');
  expect(b.name).to.equal('bar');
  expect(a.age).to.equal(2);
  expect(b.age).to.equal(3);

});

it('allows defining methods later', function(){

  var calledRun, calledSay;

  var Animal = newStruct({
    name: '',
    age: 0
  });

  Animal.method('run', run);
  Animal.method('say', say);

  var a = Animal({ name: 'foo', age: 2 }),
      b = Animal({ name: 'bar', age: 3 });

  expect(a.name).to.equal('foo');
  expect(b.name).to.equal('bar');
  expect(a.age).to.equal(2);
  expect(b.age).to.equal(3);

  expect(a.run()).to.equal(a);
  expect(a.say('p1', 'p2', 'p3')).to.equal(a);
  expect(a.calledRun).to.be.true;
  expect(a.calledSay).to.be.true;

  expect(b.run()).to.equal(b);
  expect(b.say('p1', 'p2', 'p3')).to.equal(b);
  expect(b.calledRun).to.be.true;
  expect(b.calledSay).to.be.true;

  function run (animal) {
    animal.calledRun = true;
    return animal;
  }

  function say (animal, p1, p2, p3) {
    animal.calledSay = true;
    expect(p1).to.equal('p1');
    expect(p2).to.equal('p2');
    expect(p3).to.equal('p3');
    return animal;
  }

});

it('creates a new struct from anotehr', function(){
  var Animal = newStruct({
    name: '',
    type: '',
    legs: 0,
    age: 0
  });

  var Cat = Animal.extend({
    type: 'cat',
    legs: 4
  });

  var dongdong = Cat('dongdong', 2);

  expect(dongdong.name).to.equal('dongdong');
  expect(dongdong.type).to.equal('cat');
  expect(dongdong.legs).to.equal(4);
  expect(dongdong.age).to.equal(2);
});

it('calls constructor method after initialization', function(){

  var Animal = newStruct({
    construct: construct,
    name: '',
    type: '',
    legs: 0,
    age: 0
  });


  function construct (animal){
    expect(animal.name).to.equal('dongdong');
    expect(animal.type).to.equal('cat');
    expect(animal.legs).to.equal(4);
    expect(animal.age).to.equal(2);

    animal.ok = true;
  }


  var animal = Animal('dongdong', 'cat', 4, 2);

  expect(animal.ok).to.be.true;

});

it('lets calling super methods', function(){

  var A = newStruct({
    construct: function (a) {
      a.foo = 100;
    },
    bar: function (a, n) {
      a.qux = n;
      return 300;
    }
  });

  var B = A.extend({
    construct: function (b) {
      B.supers.construct(b);
      b.foo += 100;
    },
    bar: function (b, n) {
      var ret = B.supers.bar(b, n);
      b.qux += 100;
      return ret += 100;
    }
  });

  var a = A();
  var b = B();

  expect(b.foo).to.equal(200);
  expect(b.bar(200)).to.equal(400);
  expect(b.qux).to.equal(300);

});
