'use strict';
import ajaxFunctions from '../common/ajax-functions.jsx';
import $ from 'jquery';

//POSTs attendance to /:location/:venue
/*
const attendance = (venue) => {
   const locationEntry = document.getElementById('locationEntry')
      .value;
   ajaxFunctions.ajaxRequest('POST', '/' + locationEntry + '/' + venue, (response) => {
      console.log('Hope this works', response);
   });
   console.log('Going to:', venue);
};
*/

//Populates results in a fancy way
const showEntry = (text) => {

   const results = document.getElementById('results');
   const wrapper = document.createElement('div');
   wrapper.className = 'result-wrapper loading';
   const result = document.createElement('div');
   result.className = 'result';
   const t = document.createTextNode(text);
   result.appendChild(t);
   result.title = text;


   result.onclick = () => {
      const locationEntry = document.getElementById('locationEntry')
         .value;
      ajaxFunctions.ajaxRequest('POST', '/' + locationEntry + '/' + text, (response) => {
         console.log('Hope this works', response);
      });
      console.log('Going to:', text);
   };

   wrapper.appendChild(result);
   results.appendChild(wrapper);

   $('.result-wrapper')
      .each((index, element) => {
         setTimeout(function () {
            element.classList.remove('loading');
         }, index * 500);
      });
};

const submitLocationEntry = () => {
   const locationEntry = document.getElementById('locationEntry')
      .value;


   ajaxFunctions.ajaxRequest('POST', '/' + locationEntry, (response) => {
      JSON.parse(response)
         .map((item) => {
            showEntry(item.name);
         });
   });
};

const commonFunctions = {
   showEntry: showEntry,
   submitLocationEntry: submitLocationEntry
}

export default commonFunctions;
