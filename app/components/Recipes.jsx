import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'

export default(props) => {
  const recipes = props.allRecipes
  return (
    <div className=" container all-recipes">
      <h3 className="recipes-list">RECIPES</h3>
      {
        recipes ? recipes.map(function(recipe) {
          return (
          <div className="row">
            <div className="overview col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Link className="recipe-link" to={`/recipes/${recipe.id}`}>
              <h4 className="overview" key={recipe.id}>{recipe.name}</h4>
              </Link>
              <ReactPlayer className="overview" url={recipe.videoUrl} />
            </div>
          </div>
          )
        })
        : null
      }
    </div>
  )
}
