'use strict';

const path = require('path');

require('dotenv')
   .load();

const Yelp = require('node-yelp-fusion');
const yelp = new Yelp({
   id: process.env.CLIENT_ID,
   secret: process.env.CLIENT_SECRET
});

module.exports = (app /*, passport*/ ) => {


   app.route('/')
      .get((req, res) => {


      });


   app.route('/:location')
      .get((req, res) => {

         let location = req.params.location;

         yelp.search("categories=bars&location=" + location)
            .then((result) => {
               res.json(result);
            });


      });

};
