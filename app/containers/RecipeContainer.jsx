import React, { Component } from 'react'
import {connect} from 'react-redux'
import 'whatwg-fetch'

import Recipe from '../components/Recipe'

const mapStateToProps = state => ({
  selectedRecipe: state.recipe.selectedRecipe
})

class RecipeContainer extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.sendSms = this.sendSms.bind(this)
  }

  sendSms(message) {
    fetch('/api/recipes/sendsms', {
      method: 'POST',
      headers: {
        Accept: 'application/JSON',
        'Content-Type': 'application/JSON'
      },
      body: JSON.stringify({message})
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let message = []
    console.log('sdss')
    const ingredients = Array.prototype.slice.call(event.target.children, 0, event.target.children.length - 1)
    console.log('asdas', ingredients)
    ingredients.map(function(child) {
      if (child.children[0].children[0].className === 'form-check-input') {
        console.log(child.firstChild)
        message.push(child.innerText)
        console.log('@@@@@@', message)
      }
    })
    this.sendSms(message)
    console.log('message!!!!!', message)
  }

  formCheck(event) {
    console.log(event.target.className)
    if (event.target.className === 'form-check-input') {
      event.target.className = 'form-check-input active'
    } else {
      event.target.className = 'form-check-input'
    }
  }

  render() {
    return (
      <Recipe
        {...this.state}
        {...this.props}
        handleSubmit={this.handleSubmit}
        formCheck={this.formCheck}
        sendSms={this.sendSms}
      />
    )
  }
}

export default connect(mapStateToProps)(RecipeContainer)
