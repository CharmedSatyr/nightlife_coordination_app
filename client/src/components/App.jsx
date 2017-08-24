'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Components
import Result from './Result.jsx'
import GitHub_btn from './GitHub-btn.jsx'

//Variable
const lastLocation = localStorage.getItem('nightlife_location') || null

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: lastLocation, //Use local storage to save this for each user
      venues: [],
      user: '?'
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
    console.log('Saving location:', c)
  }
  getUser() {
    /* DOESN'T PASS AUTHENTICATION!
            fetch('/api/user/:id', { method: 'GET' })
               .then(response => console.log('Regular fetch, no JSON:', response))
               // .then(data => data.json())
               // .then(json => console.log('Regular fetch, JSON:', json))
               .catch(err => console.error('Error:', err))
      */
    common.ajaxRequest('GET', '/api/user/:id', response => {
      console.log(typeof response)
      console.log('response from ajax:', response)
      //         if (response === 'string') {
      this.setState({
        user: response
      })
      //       }
    })

    /* DOESN'T PASS AUTHENTICATION!
            fetch('/api/user/:id', { method: 'GET' })
               .then(response => console.log('Regular fetch, no JSON:', response))
               // .then(data => data.json())
               // .then(json => console.log('Regular fetch, JSON:', json))
               .catch(err => console.error('Error:', err))
     */
    /* DOESN'T WORK!
         async function a() {
            const user = await fetch('/api/user/:id')
            //	this.setState({ user: user })
            console.log('response from async:', user);
         }
         a();*/
  }
  getVenues(c) {
    if (c) {
      common.f('/api/' + c, 'GET', response => {
        this.setState({ venues: response })
      })
    }
  }
  userTest() {
    /*      common.f('/userTest', 'GET', response => {
               console.log(response);
            })*/
    this.getUser()
  }
  componentWillMount() {
    this.getUser()
    if (lastLocation) {
      console.log('Last location:', lastLocation)
      this.getVenues(lastLocation)
    }
  }
  render() {
    return (
      <div>
        <header>
          <h1>Charmed Nightlife Coordination App</h1>
          <h4>
            Do I know you? Your name is... {this.state.user}
          </h4>
          <br />
          {<GitHub_btn />}
        </header>

        <main>
          <p>Type your location below to see nightlife in your area.</p>
          <h1>
            Location: {this.state.location}
          </h1>
          <input id="locationSubmitBox" type="text" />
          <button onClick={this.handleSubmit}>Search</button>
          <br />
          <button onClick={this.userTest.bind(this)}>User Test</button>
          <div>
            <div>
              Results:
              {this.state.venues.map((item, index) => {
                return (
                  <Result
                    key={index}
                    zip={item.location.zip_code}
                    location={this.state.location}
                    item={item}
                  />
                )
              })}
            </div>
          </div>
        </main>

        <footer />
      </div>
    )
  }
}
