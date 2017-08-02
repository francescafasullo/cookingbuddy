import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'

export default(props) => {
  console.log('single recipe props', props.selectedRecipe)
  const recipe = props.selectedRecipe
  const handleSubmit = props.handleSubmit
  const formCheck = props.formCheck
  return (
  <div className="container">
    <h2 className="bold">{recipe.name ? recipe.name.toUpperCase() : null}</h2>
    <ReactPlayer url={recipe.videoUrl} />
    <h3 className="bold">Ingredients:</h3>
    <form onSubmit={handleSubmit}>
            {
              recipe.ingredients ? recipe.ingredients.map((ingredient) => {
                return (
                  <div className="form-check">
                    <label className="form-check-label">
                      <input type="checkbox" className="form-check-input" value={ingredient} onChange={formCheck}></input>
                        {ingredient}
                    </label>
                  </div>
                )
              }) : null
            }
      <button type="submit" className="btn btn-warning text">Text Me My Shopping List!</button>
    </form>
    <h3 className="bold">Estimated Cooking Time: {recipe.time}</h3>
    <Link to={`/recipes/${recipe.id}/1`}>
      <button type="button" className="btn btn-warning">Start Cooking!</button>
    </Link>
  </div>
  )
}
