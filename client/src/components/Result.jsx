'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Component
export default class Result extends Component {
  constructor(props) {
    super(props)
    this.state = { numAttending: 'Loading...' }
    this.addAttendee = this.addAttendee.bind(this)
    this.numAttending = this.numAttending.bind(this)
  }
  numAttending() {
    const venueURL =
      '/api/' +
      this.props.location +
      '/' +
      this.props.zip +
      '/' +
      this.props.item.name

    common.f(venueURL, 'GET', response => {
      this.setState({
        numAttending: response
      })
    })
  }
  addAttendee() {
    const venueURL =
      '/api/' +
      this.props.location +
      '/' +
      this.props.zip +
      '/' +
      this.props.item.name

    common.ajaxRequest('POST', venueURL, response => {
      console.log('Response:', response)
      const data = JSON.parse(response)
      console.log('Parsed data:', data)
      if (!(typeof data === 'number')) {
        console.log('Error:', data)
      } else {
        this.setState({
          numAttending: data
        })
      }
    })

    /* See App.jsx for different fetch approaches... they stopped working since Auth */
  }
  componentWillMount() {
    this.numAttending()
  }
  render() {
    return (
      <div className="result" onClick={this.addAttendee}>
        {this.props.item.name}
        <div className="numAttendingBox">
          {this.state.numAttending}
        </div>
      </div>
    )
  }
}
