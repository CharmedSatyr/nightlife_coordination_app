'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Component
const GitHub_btn = ({ permissions }) => {
  return (
    <div>
      {permissions
        ? <a href="/logout">
            <button>GitHub Logout</button>
          </a>
        : <a href="/auth/github">
            <button>GitHub Login</button>
          </a>}
    </div>
  )
}

export default GitHub_btn
