const Cocktail = require('./cocktails.model');

function getAllCocktails() {
  return Cocktail.find();
}

async function getCocktailById(id) {
  const cocktail = await Cocktail.findById(id);

  if (!cocktail) {
    throw new Error('Cocktail not found');
  }
  return cocktail;
}

function createCocktail(data) {
  return Cocktail.create(data);
}

async function updateCocktail(id, data) {
  const foundCocktail = await Cocktail.findById(id);

  if (!foundCocktail) {
    throw new Error(`Cocktail not found with id ${id}`);
  }

  return Cocktail.findByIdAndUpdate(id, data, { new: true, upsert: true });
}

async function deleteCocktail(id) {
  const cocktail = await Cocktail.findById(id);

  if (!cocktail) {
    throw new Error(`Cocktail not found with id ${id}`);
  }

  return Cocktail.findByIdAndDelete(id);
}

module.exports = {
  getAllCocktails,
  getCocktailById,
  createCocktail,
  updateCocktail,
  deleteCocktail,
};
