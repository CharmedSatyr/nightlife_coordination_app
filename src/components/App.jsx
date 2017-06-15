'use strict';

import React from 'react';
import commonFunctions from '../common/common.js';
import $ from 'jquery';

$(document)
   .ready(() => {
      $('.result-wrapper')
         .each((index, element) => {
            setTimeout(function () {
               element.classList.remove('loading');
            }, index * 500);

         });
   });

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
          <div className='result-wrapper loading'><div className='result'>TEST ME OUT</div></div>
          <div className='result-wrapper loading'><div className='result'>TEST ME OUT</div></div>
          <div className='result-wrapper loading'><div className='result'>TEST ME OUT</div></div>
          <div className='result-wrapper loading'><div className='result'>TEST ME OUT</div></div>

         <div id='results'></div>

       </div>
      );
   };
};

export default App;
