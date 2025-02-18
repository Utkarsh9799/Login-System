const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            //Checking if user exists using email
            User.findOne({email: email})
                .then(user => {
                    if(!user) {
                        return done(null, false, {message: 'Email is not registered!'});
                    }

                    //If user exists, check password
                    bcrypt.compare(password, user.password, (err, success) => {
                        if(err) throw err;

                        if(success) {
                            return done(null, user);
                        }
                        else {
                            return done(null, false, {message: 'Incorrect password!'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
          done(err, user);
        });
    });
}
