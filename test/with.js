var Struct = require('../');

var Brick = Struct({
  build: function (brick) {
    console.log('building %s', brick.key, brick.files.join(', '));
  }
});

var Centered = Struct({
  New: function () {
    var centered = Centered({
      centered: true
    });

    centered.brick = Brick({
      key: 'cover',
      files: ['centered.css', 'centered.html']
    });

    return centered;
  },
  foo: function (centered) {
    console.log('centered foo');
  },
  bar: function (cover) {
    console.log('centered bar');
  }
});


var Cover = Struct({
  New: function () {
    var cover = Cover({
      cover: true
    });

    cover.brick = Brick({
      key: 'cover',
      files: ['centered.css', 'centered.html']
    });

    return cover;
  },
  foo: function (cover) {
    console.log('cover foo');
  },
  bar: function (cover) {
    console.log('cover bar');
  }
})

var Mixing = Struct(Centered, Cover, {
  New: function () {
    var centered = Centered.New();
    var cover = Cover.New();

    var mixing = Mixing.With(centered, cover, {
      mixing: true
    });

    mixing.brick = Brick({
      key: 'mixing',
      files: ['mixing.css', 'mixing.html'].concat(centered.brick.files).concat(cover.brick.files)
    });

    return mixing;
  },
  foo: function (mixing) {
    Centered.methods.foo(mixing);
    Cover.methods.foo(mixing);
    console.log('mixing foo');
  }
});

var m = Mixing.New();
console.log('centered: %s cover: %s mixing %s', m.centered, m.cover, m.mixing);
m.foo();
m.bar();

m.brick.build();
