'use strict'

//PACKAGES
import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//COMPONENTS
import Result from './Result.jsx'
import GitHub_btn from './GitHub-btn.jsx'
import Yelp from './Yelp.jsx'

//FUNCTIONS
import common from '../common/common.jsx'

//GLOBAL VARIABLE
const lastLocation =
  localStorage.getItem('nightlife_location') || 'Search your location!'

//MAIN
export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: lastLocation, //Use local storage to save this for each user
      venues: [],
      user: '',
      permissions: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const location = document.getElementById('locationSubmitBox').value
    this.setState({ location: location, venues: [] })
    this.getVenues(location)
    this.saveToLocal(location)
  }
  saveToLocal(c) {
    localStorage.setItem('nightlife_location', c)
    console.log('Enjoy ' + c + '!')
  }
  getVenues(c) {
    if (c) {
      common.f('/api/' + c, 'GET', response => {
        this.setState({ venues: response })
      })
    }
  }
  getUser() {
    common.ajaxRequest('GET', '/api/user/:id', response => {
      if (response.length < 25) {
        const data = JSON.parse(response)
        this.setState({
          user: data,
          permissions: true
        })
      }
    })
  }
  componentWillMount() {
    this.getUser()
    if (lastLocation) {
      console.log('Having fun in ' + lastLocation + '?')
      this.getVenues(lastLocation)
    }
  }
  render() {
    const results = this.state.venues.map((item, index) =>
      <Result permissions={this.state.permissions} key={index} item={item} />
    )

    return (
      <div>
        <header>
          <h1 className="title">Charmed Nightlife Coordination App</h1>
        </header>

        <main>
          <h3 className="scene">
            Your scene: {this.state.location}
          </h3>
          <input
            id="locationSubmitBox"
            placeholder=" Search locations here..."
            type="text"
          />
          <button className="go" onClick={this.handleSubmit}>
            GO
          </button>
          <div className="results-wrapper">
            <Yelp />
            <GitHub_btn
              permissions={this.state.permissions}
              user={this.state.user}
            />
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}>
              {results}
            </ReactCSSTransitionGroup>
          </div>
        </main>

        <footer />
      </div>
    )
  }
}
