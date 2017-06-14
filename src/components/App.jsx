'use strict';

import React from 'react';
import $ from 'jquery';

const ready = (fn) => {
   if (typeof fn !== 'function') {
      return;
   }

   if (document.readyState === 'complete') {
      return fn();
   }

   document.addEventListener('DOMContentLoaded', fn, false);
}

const ajaxRequest = (method, url, callback) => {
   const xmlhttp = new XMLHttpRequest();

   xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
         callback(xmlhttp.response);
      }
   };

   xmlhttp.open(method, url, true);
   xmlhttp.send();
};

const ajaxFunctions = {
   ready: ready,
   ajaxRequest: ajaxRequest
};

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }
   componentDidMount() {}
   render() {
      return (
         <div>
         <br/>
         <p>Type your location below to see nightlife in your area.</p>
         <input type='text'></input>
         <button type='submit'>Submit</button>
         <br/>
       </div>
      );
   };
};

export default App;
