'use strict'

const {STRING, ARRAY, TEXT} = require('sequelize')

module.exports = db => db.define('recipes', {
  name: STRING,
  ingredients: {
    type: ARRAY(STRING),
    allowNull: false
  },
  videoUrl: {
    type: STRING
  },
  time: {
    type: STRING
  }
})

module.exports.associations = (Recipe, {RecipeStep, Resource}) => {
  Recipe.hasMany(RecipeStep)
  Recipe.hasMany(Resource)
}
