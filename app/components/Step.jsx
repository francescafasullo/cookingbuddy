import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import { Link } from 'react-router'
import CountdownTimer from './Countdown'
import Sound from 'react-sound'

const clicked = false
const showTimer = function(clicked) {
  clicked = true
  console.log(clicked)
  return clicked
}

export default class Step extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clicked: false
    }
    this.handleTimerClick = this.handleTimerClick.bind(this)
    this.help = this.help.bind(this)
  }

  handleTimerClick(event) {
    event.preventDefault()
    this.setState({clicked: true})
    console.log('-----', this.props)
  }

  help(resources) {
    if (resources.length) {
      return <h4 className="help">Need help?</h4>
    }
  }

  render() {
    const step = this.props.selectedStep
    console.log('step does it have stuff', step)
    return (
    <div className="container">
      <h3 className="bold">Step {step.step}</h3>
      <p>{step.text}</p>
      <div>
      {
        !this.state.clicked && step.timer ? <button type="button" className="btn btn-warning" onClick={this.handleTimerClick}>Start Timer</button> : null
      }
      {
        this.state.clicked ? <CountdownTimer secondsRemaining={step.timer} /> : null
      }
      </div>
      <div>
      {
        step.step !== 1 ? <Link to={`/recipes/${step.recipe_id}/${step.step - 1}`}><button type="button" className="btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
          </button></Link> : null
      }
      {
        step.step === 1 ? <Link to={`/recipes/${step.recipe_id}`}><button type="button" className="btn btn-default" aria-label="Left Align">
            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
          </button></Link> : null
      }
      {
        !step.last ? <Link to={`/recipes/${step.recipe_id}/${step.step + 1}`}>
        <button type="button" className="btn btn-default" aria-label="Left Align">
          <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
        </button>
      </Link> : null
      }
      </div>
      {
         step.resources ? this.help(step.resources) : null
      }
      <ul>
        {
          step.resources ? step.resources.map((resource) => {
            return <Link to={resource.videoUrl}><li className="resource">{resource.name}</li></Link>
          }) : null
        }
      </ul>
    </div>
    )
  }
}

// class with local constructor and state
// this.state.clicked that i can update
