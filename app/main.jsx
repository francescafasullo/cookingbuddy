'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Navbar from './components/Navbar'
import RecipesContainer from './containers/RecipesContainer'
import RecipeContainer from './containers/RecipeContainer'
import StepContainer from './containers/StepContainer'

import {getRecipes, getOneRecipe, getOneStep} from './reducers/recipe.jsx'

const onRecipesEnter = nextRouterState => {
  store.dispatch(getRecipes())
}

const onRecipeEnter = nextRouterState => {
  const recipeId = nextRouterState.params.recipeId
  store.dispatch(getOneRecipe(recipeId))
}

const onStepEnter = nextRouterState => {
  const recipeId = nextRouterState.params.recipeId
  const step = nextRouterState.params.step
  store.dispatch(getOneStep(recipeId, step))
}

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <Navbar />
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <Route path="/home" component={RecipesContainer} onEnter={onRecipesEnter} />
        <IndexRedirect to="/recipes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/recipes" component={RecipesContainer} onEnter={onRecipesEnter} />
        <Route path="/recipes/:recipeId" component={RecipeContainer} onEnter={onRecipeEnter} />
        <Route path="/recipes/:recipeId/:step" component={StepContainer} onEnter={onStepEnter} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)

      // <nav>
      //   {user ? <WhoAmI/> : <Login/>}
      // </nav>
