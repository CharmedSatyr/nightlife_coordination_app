'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Component
export default class GitHub_btn extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <a href="/auth/github">
          <button>GitHub Login</button>
        </a>
        <a href="/logout">
          <button>GitHub Logout</button>
        </a>
      </div>
    )
  }
}
