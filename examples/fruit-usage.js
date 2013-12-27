var Fruit = require('./fruit');

var orange = Fruit.New('Azer', 'Finike', 'Orange', 2, 4);
var apple = Fruit.New('Adem', 'Isparta', 'apple', 2, 3);

console.log(orange.intro());
console.log(orange.price() == 13);
console.log(orange.priceAtWholeFoods() == 19.5);
console.log(orange.priceWithDiscount() == 11.5);

console.log(apple.intro());
console.log(apple.price() == 10);
console.log(apple.priceAtWholeFoods() == 15);
console.log(apple.priceWithDiscount() == 9);
