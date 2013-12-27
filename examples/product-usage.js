var NewProduct = require('./product').New;

var notebook = NewProduct('notebook', 4, 6);
var pencil = NewProduct('pencil', 6, 12);

console.log(notebook.name == 'notebook');
console.log(notebook.price() == 12);
console.log(notebook.priceWithDiscount() == 9);

pencil.profit -= 2;

console.log(pencil.name == 'pencil');
console.log(pencil.price() == 18);
console.log(pencil.priceWithDiscount() == 13);
