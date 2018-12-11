const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');


module.exports = function (passport) {
    var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
  
  passport.use(new FacebookStrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));
  
   

}