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
   //Next, clear results of any previous results before repopulating---...

   const wrapper = document.createElement('div');
   wrapper.className = 'result-wrapper loading';
   const result = document.createElement('div');
   result.className = 'result';

   const displayName = document.createTextNode(text);
   result.appendChild(displayName);
   result.title = text;

   ajaxFunctions.ajaxRequest('GET', '/' + locationEntry + '/' + text, (response) => {

      const numAttendingBox = document.createElement('div');
      numAttendingBox.className = 'numAttendingBox';

      //Can't seem to get a '0' to show up for a blank response...
      let num;
      if (response) {
         num = response;
      } else {
         num = '0';
      }

      const numAttending = document.createTextNode(num);
      numAttendingBox.appendChild(numAttending);
      result.appendChild(numAttendingBox);
   });

   result.onclick = () => {
      const locationEntry = document.getElementById('locationEntry')
         .value;
      console.log('click');
      //This ajax stopped working
      ajaxFunctions.ajaxRequest('POST', '/' + locationEntry + '/' + text, (response) => {
         console.log('Increasing number of guests to:', response);
         //Should call showEntry again or something
      });

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
