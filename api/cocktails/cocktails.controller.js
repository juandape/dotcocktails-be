const {
  getAllCocktails,
  getCocktailById,
  createCocktail,
  updateCocktail,
  deleteCocktail,
} = require('./cocktails.service');

async function getAllHandler(req, res, next) {
  try {
    const cocktails = await getAllCocktails();
    res.status(200).json(cocktails);
  } catch (error) {
    next(error);
  }
}

async function getByIdHandler(req, res, next) {
  try {
    const { id } = req.params;
    const cocktail = await getCocktailById(id);

    if (!cocktail) {
      return res.status(404).json({ message: 'Cocktail not found' });
    }

    return res.status(200).json(cocktail);
  } catch (error) {
    next(error);
  }
}

async function createHandler(req, res, next){
  try {
    const cocktail = await createCocktail(req.body);
    res.status(201).json({cocktail, message: 'Cocktail created' });
  } catch (error) {
    next(error);
  }
}

async function updateHandler(req, res, next) {
  try {
    const { id } = req.params;
    const cocktail = await updateCocktail(id, req.body);

    if (!cocktail) {
      return res.status(404).json({ message: 'Cocktail not found' });
    }

    return res.status(200).json({cocktail, message: 'Cocktail updated' });
  } catch (error) {
    next(error);
  }
}

async function deleteHandler
  (req, res, next) {
  try {
    const { id } = req.params;
    const cocktail = await deleteCocktail(id);

    if (!cocktail) {
      return res.status(404).json({ message: 'Cocktail not found' });
    }

    return res.status(200).json({ message: 'Cocktail deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllHandler,
  getByIdHandler,
  createHandler,
  updateHandler,
  deleteHandler,
};