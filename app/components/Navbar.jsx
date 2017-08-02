import React, { Component } from 'react'

export default class extends Component {
  constructor() {
    super()
  }

  render() {
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <a className="navbar-brand" href="/home">CookingBuddy</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/home">HOME</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/recipes">RECIPES</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/resources">RESOURCES</a>
              </li>
            </ul>
         </div>
       </nav>
    )
  }
}
