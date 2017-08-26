//PACKAGES
import React, { Component } from 'react'

//RESOURCES
import Yelp_logo from '../img/Yelp_trademark_RGB_outline.png'

//COMPONENT
const Yelp = () => {
  return (
    <div className="yelp">
      <div className="text">Results from</div>
      <a href="https://www.yelp.com">
        <img className="y-logo" src={Yelp_logo} />
      </a>
    </div>
  )
}

export default Yelp
