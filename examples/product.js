var Struct = require('../');

var Product = Struct({
  New: New,
  price: price,
  priceWithDiscount: priceWithDiscount,
  priceWithNoProfit: priceWithNoProfit
});

module.exports = Product;

function New (name, cost, profit, tax) {
  return Product({
    name: name,
    cost: cost,
    profit: profit || 3,
    tax: tax || 2
  }) 
}

function price (product) {
  return product.cost + product.profit + product.tax;    
}

function priceWithDiscount (product) {
  return product.priceWithNoProfit() + (product.profit / 2);    
}

function priceWithNoProfit (product) {
  return product.cost + product.tax;    
}
