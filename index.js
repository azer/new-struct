var methodify = require("methodify");
var mix = require("mix-objects");

module.exports = define;

function define () {
  var functions = arguments[arguments.length - 1];

  var i = arguments.length - 1;
  while (i--) {
    mix.one(functions, arguments[i].methods);
  }

  i = undefined;

  constructor.With = constructWith;
  constructor.methods = functions;
  constructor.isAStruct = true;

  extractStaticMethods(functions, constructor);

  return constructor;

  function constructor (object) {
    return methodify(object, functions);
  }

  function constructWith () {
    var mixwith = Array.prototype.slice.call(arguments, 0, -1);
    var object = arguments[arguments.length - 1];

    mix(object, mixwith);

    return methodify(object, functions);
  }
}

function extractStaticMethods (from, to) {
  var key;
  for (key in from) {
    if (typeof from[key] != 'function' || key[0] != key[0].toUpperCase()) continue;
    to[key] = from[key];
    delete from[key];
  }
}
