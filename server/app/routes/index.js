'use strict'

const path = process.cwd()

//Controllers
const VenueController = require('../controllers/venueController.server.js')

//Controller Object
const venueController = new VenueController()

module.exports = (app, passport) => {
  const permissions = (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('YOU ARE NOW LOGGED IN!')
      return next()
    } else {
      console.log("YOU AIN'T LOGGED IN, BITCH")
      res.redirect('/login')
    }
  }

  //      1. User searches a Location
  app.route('/').get(permissions, (req, res) => {
    res.sendFile(path + '/client/views/index.html')
  })

  app.route('/login').get((req, res) => {
    res.sendFile(path + '/client/views/login.html')
  })

  app.route('/logout').get((req, res) => {
    req.logout()
    res.redirect('/login')
  })

  app.route('/api/user/:id').get(permissions, (req, res) => {
    res.json(req.user.github.username)
  })

  app.route('/auth/github').get(passport.authenticate('github'))

  app.route('/auth/github/callback').get(
    passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )

  app.route('/api/:location').get(venueController.getLocation)

  app.route('/userTest').get(venueController.userTest)

  /*
      app.route('/api/:id/:location/:zip/:venue')
         .get((req, res) => {
            console.log('GET: THIS IS HOT HOT FIRE, ' + req.params.id)
            res.json('GET: THIS IS HOT HOT FIRE, ' + req.params.id)
         })
         .post(permissions, (req, res) => {
            console.log('POST: THIS IS HOT HOT FIRE, ' + req.params.id)
            res.json('POST: THIS IS HOT HOT FIRE, ' + req.params.id)
         })
         .delete(permissions, (req, res) => {
            console.log('DELETE: THIS IS HOT HOT FIRE, ' + req.params.id)
            res.json('DELETE: THIS IS HOT HOT FIRE, ' + req.params.id)
         })
   */

  app
    .route('/api/:location/:zip/:venue')
    .get(venueController.getVenue)
    .post(permissions, venueController.authClickVenue)
}
