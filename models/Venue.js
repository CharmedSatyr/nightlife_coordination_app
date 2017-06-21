'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/*
1. User searches a Location
2. options pop up from Yelp
3. if a user clicks a location, the location is saved (name and phone (unique ID)?)
4. else if the location already exists, no action
4. then, if that user isn't already attending, their name is added to the attending
5. else if a user is already attending, their anme is removed from the attending
6. if a location has no attending, it is removed
*/

const Venue = new Schema({
   name: String,
   phone: String,
   attending: [String]
});

module.exports = mongoose.model('Venue', Venue);
