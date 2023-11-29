const mongoose = require('mongoose');

const CocktailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
      trim: true,
    },
    history: {
      type: String,
      required: true,
      trim: true,
    },
    preparationMethod: {
      type: String,
      required: true,
      trim: true,
    },
    glass: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    alcoholContent: {
      type: String,
      required: false,
      trim: true,
    },
    nutritionalValue: {
      type: String,
      required: false,
      trim: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    garnish: {
      type: String,
      required: false,
      trim: true,
    },
    preparation: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cocktails = mongoose.model('Cocktail', CocktailsSchema);
module.exports = Cocktails;
