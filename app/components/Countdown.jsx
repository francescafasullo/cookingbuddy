import React, { Component } from 'react'
import Sound from 'react-sound'
import ReactPlayer from 'react-player'
import Player from 'react-soundcloud-player'

class CountdownTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      secondsRemaining: 0,
      finished: false
    }
    this.tick = this.tick.bind(this)
  }

  tick() {
    this.setState({secondsRemaining: this.state.secondsRemaining - 1})
    if (this.state.secondsRemaining <= 0) {
      clearInterval(this.interval)
      this.setState({finished: true})
    }
  }

  componentDidMount() {
    this.setState({ secondsRemaining: this.props.secondsRemaining })
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        <div>Seconds Remaining: {this.state.secondsRemaining}</div>
        {
          this.state.finished ? <ReactPlayer className="timer hide" url="https://www.youtube.com/watch?v=XUbhXSoWDOg" playing/> : null
        }
      </div>
    )
  }
}

export default CountdownTimer
