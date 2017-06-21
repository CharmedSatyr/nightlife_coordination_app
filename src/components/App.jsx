'use strict';

import React from 'react';
import commonFunctions from '../common/common.jsx';
import $ from 'jquery';

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   render() {


      return (
         <div>

          <p>Type your location below to see nightlife in your area.</p>
          <input id='locationEntry' type='text'></input>
          <button type='submit' onClick={commonFunctions.submitLocationEntry}>Submit</button>
          <br/>
         <div id='results'></div>

       </div>
      );
   };
};

export default App;
