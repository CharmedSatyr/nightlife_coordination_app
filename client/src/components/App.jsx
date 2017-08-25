'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Components
import Result from './Result.jsx'
import GitHub_btn from './GitHub-btn.jsx'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

//Variable
const lastLocation =
  localStorage.getItem('nightlife_location') || 'Search your location!'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: lastLocation, //Use local storage to save this for each user
      venues: [],
      user: 'Log in to share your plans!',
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
          user: 'YOLO, ' + data + '! Where are you going tonight?',
          permissions: true
        })
      }
    })

    // DOESN'T PASS AUTHENTICATION!
    /*  fetch('/api/user/:id', {
      credentials: 'include', //true
      mode: 'cors', //'same-origin'
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.length < 25) {
          const data = response.json()
          this.setState({
            user: 'YOLO, ' + data + '! Where are you going tonight?',
            permissions: true
          })
        }
      })
      .catch(err => console.error('Error:', err))
*/
    /* DOESN'T WORK - despite loading babel-polyfill and babel-preset-env!
         async function a() {
            const user = await fetch('/api/user/:id')
            //	this.setState({ user: user })
            console.log('response from async:', user);
         }
         a();*/
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
          <h1>Charmed Nightlife Coordination App</h1>
          <h3 />
          {<GitHub_btn permissions={this.state.permissions} />}
        </header>

        <main>
          <h3>
            Your scene: {this.state.location}
          </h3>
          <input
            id="locationSubmitBox"
            placeholder="Search locations here..."
            type="text"
          />
          <button onClick={this.handleSubmit}>Search</button>
          <br />
          <div className="results-wrapper">
            <h3>
              {this.state.user}
            </h3>
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
