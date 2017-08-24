'use strict'

const Venue = require('../models/Venue.js')
const User = require('../models/User.js')

/*** ENVIRONMENTAL VARIABLES ***/
require('dotenv').load()

/*** YELP FUSION API ***/
const Yelp = require('node-yelp-fusion')
const yelp = new Yelp({
  id: process.env.YELP_CLIENT_ID,
  secret: process.env.YELP_CLIENT_SECRET
})

class VenueController {
  constructor(req, res) {
    let name_view //This is the standard display name for the user

    //User test
    this.userTest = (req, res) => {
      name_view =
        req.user.github.displayName ||
        req.user.twitter.displayName ||
        req.user.github.username ||
        req.user.twitter.username

      User.findOne(
        { 'github.id': req.user.github.id },
        { _id: false }
      ).exec((err, result) => {
        if (err) {
          throw err
        }
        console.log(result.github.displayName)
        res.json(result.github.displayName)
      })
    }
    //Pull venues for a specific location from the Yelp! API
    this.getLocation = (req, res) => {
      const location = req.params.location
      console.log('Searching', location + '...')

      //      2. options pop up from Yelp
      yelp
        .search('categories=bars&location=' + location)
        .then(result => {
          res.json(result.businesses)
        })
        .catch(err => {
          console.log(
            'Search for ' +
              location +
              ' nightlife REJECTED by Yelp! API...\n' +
              err
          )
        })
    }

    //Check venue attendees from the database
    this.getVenue = (req, res) => {
      Venue.findOne({
        name: req.params.venue,
        zip: req.params.zip
      }).exec((err, result) => {
        if (err) {
          console.error(err)
        }
        if (result) {
          res.json(result.attending.length)
        } else {
          res.json(0)
        }
      })
    }

    this.authClickVenue = (req, res) => {
      //   3. if a user clicks a location, check if the location exists
      Venue.findOne({
        //AndUpdate ??
        name: req.params.venue,
        zip: req.params.zip
      }).exec((err, result) => {
        if (err) {
          console.error(err)
        }
        // 4. if the location already exists, push a candidate to attending (worry about unattend later);
        if (result) {
          //if the person is already in attending, remove them
          if (result.attending.indexOf(name_view) >= 0) {
            result.attending.splice(result.attending.indexOf(name_view), 1)
          } else {
            //Otherwise, add them
            result.attending.push(name_view)
          }

          result.save(err => {
            if (err) {
              console.error(err)
            }
          })
          res.json(result.attending.length)
        } else {
          //5. if the location doesn't exist, it is saved (name and phone (unique ID)?)
          const newVenue = new Venue({
            name: req.params.venue,
            zip: req.params.zip,
            attending: [name_view]
          })

          newVenue.save((err, doc) => {
            if (err) {
              console.error(err)
            }
            res.json(doc.attending.length)
          })
        }
      })
    }

    this.clickVenue = (req, res) => {
      //   3. if a user clicks a location, check if the location exists
      Venue.findOne({
        //AndUpdate ??
        name: req.params.venue,
        zip: req.params.zip
      }).exec((err, result) => {
        if (err) {
          console.error(err)
        }
        // 4. if the location already exists, push a candidate to attending (worry about unattend later);
        if (result) {
          result.attending.push('Guest')

          result.save(err => {
            if (err) {
              console.error(err)
            }
          })
          res.json(result.attending.length)
        } else {
          //5. if the location doesn't exist, it is saved (name and phone (unique ID)?)
          const newVenue = new Venue({
            name: req.params.venue,
            zip: req.params.zip,
            attending: ['Guest']
          })

          newVenue.save((err, doc) => {
            if (err) {
              console.error(err)
            }
            res.json(doc.attending.length)
          })
        }
      })
    }
  }
}

module.exports = VenueController
