const {STRING, ARRAY, TEXT, INTEGER} = require('sequelize')

module.exports = db => db.define('resources', {
  name: STRING,
  videoUrl: STRING
})

module.exports.associations = (Resource, {RecipeStep, Recipe}) => {
  Resource.belongsTo(RecipeStep)
  Resource.belongsTo(Recipe)
}
