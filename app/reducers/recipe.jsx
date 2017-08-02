import axios from 'axios'

const initialState = {
  allRecipes: [],
  selectedRecipe: {},
  selectedStep: {}
}

/* ---- actions ---- */
const GET_ALL_RECIPES = 'GET_ALL_RECIPES'
const GET_SINGLE_RECIPE = 'GET_SINGLE_RECIPE'
const GET_SINGLE_STEP = 'GET_SINGLE_STEP'

/* ---- action creators ---- */
const getAllRecipes = (allRecipes) => ({
  type: GET_ALL_RECIPES, allRecipes
})

const getSingleRecipe = (selectedRecipe) => ({
  type: GET_SINGLE_RECIPE, selectedRecipe
})

const getSingleStep = (selectedStep) => ({
  type: GET_SINGLE_STEP, selectedStep
})

/* ---- dispatchers ---- */
export const getRecipes = () =>
  dispatch => {
    axios.get(`/api/recipes/`)
    .then(res => res.data)
    .then(recipes => {
      console.log('!!!!!', recipes)
      return dispatch(getAllRecipes(recipes))
    })
    .catch(err => console.error(err))
  }

export const getOneRecipe = (recipeId) =>
  dispatch => {
    axios.get(`/api/recipes/${recipeId}`)
    .then(res => res.data)
    .then(recipe => dispatch(getSingleRecipe(recipe)))
    .catch(err => console.error(err))
  }

export const getOneStep = (recipeId, step) =>
  dispatch => {
    axios.get(`/api/recipes/${recipeId}/${step}`)
    .then(res => res.data)
    .then(step => dispatch(getSingleStep(step)))
    .catch(err => console.error(err))
  }

/* ---- reducer ---- */
const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_ALL_RECIPES:
    newState.allRecipes = action.allRecipes
    break

  case GET_SINGLE_RECIPE:
    newState.selectedRecipe = action.selectedRecipe
    break

  case GET_SINGLE_STEP:
    newState.selectedStep = action.selectedStep
    break

  default:
    return state
  }
  return newState
}

export default reducer
