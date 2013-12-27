var Struct = require('../');

var Plant = Struct({
  New: New,
  cost: cost
});

module.exports = Plant;

function New (growthLength, waterPerWeek) {
  return Plant({
    growthLength: growthLength,
    waterPerWeek: waterPerWeek
  });
}

function cost (plant) {
  return plant.growthLength * plant.waterPerWeek;  
}
