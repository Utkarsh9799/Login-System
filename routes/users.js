const express = require('express');
const router = express.Router();

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
        
    }
});

module.exports = router;