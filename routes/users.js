const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//User model
const User = require('../models/User');

//Login page
router.get('/login', (req, res) => res.render("login"));

//Register page
router.get('/register', (req, res) => res.render("register"));

//Hnadling registration
router.post('/register', (req, res) => {
    //Getting form values
    const { name, email, password, password2 } = req.body;
    let errors = [];

    if(!name || !email || !password || !password2)
        errors.push({msg: 'Please fill all the fields!'});

    if(password != password2)
        errors.push({msg: 'Passwords do not match!'});

    if(password.length < 8)
        errors.push({msg: 'Password must be at least 8 characters long!'});

    if(errors.length != 0)
    {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else
    {
        //If all fields have valid entry    
        User.findOne({email: email})
            .then(user => {
                if(user) 
                {
                    errors.push({msg: 'Email is already registered!'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else
                {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    
                    //Encrypting password
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            //Setting password as hash value
                            newUser.password = hash;

                            //Saving user to database
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Registration successful, please login!');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        }))
                }
            });
    }
});

module.exports = router;