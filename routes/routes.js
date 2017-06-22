'use strict';

const path = require('path');

const Venue = require('../models/Venue.js');

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

   //      1. User searches a Location
   app.route('/:location')
      .post((req, res) => {

         const location = req.params.location;

         //      2. options pop up from Yelp
         yelp.search("categories=bars&location=" + location)
            .then((result) => {
               res.json(result.businesses);
            });
      });

   app.route('/:location/:venue')
      .post((req, res) => {

         //   3. if a user clicks a location, check if the location exists
         Venue.findOne({ //AndUpdate ??
               'name': req.params.venue
            })
            .exec((err, result) => {
               if (err) {
                  console.error(err);
               }
               // 4. if the location already exists, push a candidate to attending (worry about unattend later);
               if (result) {
                  result.attending.push('Guest');

                  result.save((err) => {
                     if (err) {
                        console.error(err);
                     }
                  });
                  res.send([result.attending.length]);
               } else {
                  //5. if the location doesn't exist, it is saved (name and phone (unique ID)?)
                  const newVenue = new Venue({
                     'name': req.params.venue,
                     'phone': 5551234,
                     'attending': ['Host']
                  });

                  newVenue.save((err, doc) => {
                     if (err) {
                        console.error(err);
                     }
                     res.json('Saving venue: ' + doc);
                  });
               }
            });
      });

   /*
   6. if a location has no attending, it is removed
   */
};
