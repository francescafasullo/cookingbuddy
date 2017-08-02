import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  recipe: require('./recipe').default
})

export default rootReducer
