import React from 'react'
import {connect} from 'react-redux'

import Recipes from '../components/Recipes'

const mapStateToProps = state => ({
  allRecipes: state.recipe.allRecipes
})

export default connect(mapStateToProps)(Recipes)
