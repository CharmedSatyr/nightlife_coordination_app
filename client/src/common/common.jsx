'use strict'

//const appUrl = window.location.origin
//const apiUrl = appUrl + '/api/:id';
/*
async function f(url, method, cb) {
   try {
      const data = await fetch(url, { method: method });
      const json = data.json()
         .then(await cb);
   } catch (err) {
      console.error(err);
   }
}
*/

function ajaxRequest(method, url, callback) {
  var xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      callback(xmlhttp.response)
    }
  }

  xmlhttp.open(method, url, true)
  xmlhttp.send()
}

const processStatus = response => {
  // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const f = (url, method, callback) => {
  fetch(url, { method: method })
    .then(processStatus)
    .then(response => response.json())
    .then(response => callback(response))
    .catch(err => console.error(err))
}

const common = {
  //   appUrl: appUrl,
  //   apiUrl: apiUrl,
  ajaxRequest: ajaxRequest,
  f: f
}

export default common