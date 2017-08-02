'use strict'

const {STRING, ARRAY, TEXT, INTEGER, BOOLEAN} = require('sequelize')

module.exports = db => db.define('recipe_steps', {
  step: INTEGER,
  ingredients: {
    type: ARRAY(STRING)
  },
  timer: INTEGER,
  text: TEXT,
  last: BOOLEAN
})

module.exports.associations = (RecipeStep, {Recipe, Resource}) => {
  RecipeStep.belongsTo(Recipe)
  RecipeStep.hasMany(Resource)
}
