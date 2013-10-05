module.exports = newStruct;

function newStruct (content){
  var struct  = Object.create(content),
      props = create.props = [],
      methods = create.methods = [];

  var key;
  for (key in struct) {
    if (typeof struct[key] == 'function') {
      methods.push(key);
    } else {
      props.push(key);
    }
  }

  function create (values){
    var copy = Object.create(struct),
        key, i;

    if (arguments.length == 1 && typeof values == 'object') {
      for (key in values) {
        copy[key] = values[key];
      }
    } else {
      i = arguments.length;
      while (i--) {
        copy[ props[i] ]= arguments[i];
      }
    }

    i = methods.length;
    while (i --) {
      copy[methods[i]] = wrapMethod(copy, struct[methods[i]]);
    }

    if (struct.construct) {
      struct.construct(copy);
    }

    return copy;
  };

  create.extend = function(ext){
    var config = Object.create(content),
        supers = {},
        create;

    var key;
    for (key in ext) {
      if (typeof config[key] == 'function') {
        supers[key] = config[key];
      }

      config[key] = ext[key];
    }

    create = newStruct(config);
    create.supers = supers;

    var ind;
    for (key in ext) {
      if (typeof ext[key] != 'function') {
        create.props.splice(create.props.indexOf(key), 1);
      }
    }

    return create;
  };

  create.method = function (name, fn){
    methods.push(name);
    struct[name] = fn;
    return create;
  };

  return create;
}

function wrapMethod (copy, method){
  return function(){
    var args = Array.prototype.slice.call(arguments);
    args.splice(0, 0, copy);
    return method.apply(undefined, args);
  };
}
