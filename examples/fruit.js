var Struct = require('../');
var Product = require('./product');
var Plant = require('./plant');

var Fruit = Struct(Product, {
  New: New,
  intro: intro,
  priceAtWholeFoods: priceAtWholeFoods,
  priceWithDiscount: priceWithDiscount
})

module.exports = Fruit;

function New (farmer, origin, kind, growthLength, waterPerWeek) {
  var plant = Plant.New(growthLength, waterPerWeek);
  var product = Product.New(kind, plant.cost(), plant.cost() * 0.5, 1);

  return Fruit.from(product, plant, {
    kind: kind,
    farmer: farmer,
    origin: origin
  });
}

function intro (fruit) {
  return fruit.kind + ' grown by ' + fruit.farmer + ' at ' + fruit.origin;
}

function priceAtWholeFoods (fruit) {
  return fruit.price() * 1.50;
}

function priceWithDiscount (fruit) {
  return Product.methods.priceWithDiscount(fruit) + 0.50;
}
