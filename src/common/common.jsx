'use strict';

import ajaxFunctions from '../common/ajax-functions.jsx';
import $ from 'jquery';

//Populates results in a fancy way
const showEntry = (text) => {
   /*
        <div className='result-wrapper loading'>
          </div class='result'>{displayName}</div>
          <div class='numAttendingBox' id={displayName+'-attendees'}>{numAttending}</div>
        </div>
   */

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
      numAttendingBox.id = text + '-attendees';
      const numAttending = document.createTextNode(response);
      numAttendingBox.appendChild(numAttending);
      result.appendChild(numAttendingBox);
   });

   result.onclick = () => {
      const locationEntry = document.getElementById('locationEntry')
         .value;
      //Why is this soooo slow?
      ajaxFunctions.ready(ajaxFunctions.ajaxRequest('POST', '/' + locationEntry + '/' + text, (response) => {
         console.log('Increasing number of guests to:', response);
         ajaxFunctions.ajaxRequest('GET', '/' + locationEntry + '/' + text, (response) => {
            console.log(response);
            document.getElementById(text + '-attendees')
               .value = response++;
         });
      }));

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
