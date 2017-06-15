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
         if (err) {
            console.error(err);
         } else {
            console.log('This is a home page');
         }
      });


   app.route('/:location')
      .post((req, res) => {

         const location = req.params.location;

         yelp.search("categories=bars&location=" + location)
            .then((result) => {

               res.json(result.businesses);
            });
      });
};
