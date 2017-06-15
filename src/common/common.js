'use strict';

import ajaxFunctions from '../common/ajax-functions.js';

const showEntry = (text) => {

   const results = document.getElementById('results');
   const div = document.createElement('div');
   div.className = 'results';
   const t = document.createTextNode(text);
   div.appendChild(t);
   div.title = text;
   const fn = () => {
      console.log('Going to:', text);
   };
   div.onclick = fn;
   results.appendChild(div);
   const br = document.createElement('br');
   results.appendChild(br);
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
