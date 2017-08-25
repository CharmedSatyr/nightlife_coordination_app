'use strict'

//Packages
import React, { Component } from 'react'

//Functions
import common from '../common/common.jsx'

//Image
import G_logo from '../img/github.png'

//Component
const GitHub_btn = ({ permissions }) => {
  return (
    <div>
      {permissions
        ? <a href="/logout">
            <img
              className="G_logo"
              src={G_logo}
              title="GitHub Logout"
              name="GitHub Logout"
            />
          </a>
        : <a href="/auth/github">
            <img
              className="G_logo"
              src={G_logo}
              title="Login with GitHub"
              name="Login with GitHub"
            />
          </a>}
    </div>
  )
}

export default GitHub_btn
