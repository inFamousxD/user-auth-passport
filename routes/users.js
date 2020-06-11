const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const router = express.Router();

// Login
router.get('/login',(req, res) => res.render('login'));
// Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Register
router.get('/register',(req, res) => res.render('register'));
// Handle
router.post('/register', (req, res) => {
    const {name, email, password, passwordConfirm} = req.body;
    let err = [];

    // field check
    ( !name || !email || !password || !passwordConfirm ) ? err.push({ message: "Please fill in all fields." }) : console.log('Fields passed');
    // password match check
    password !== passwordConfirm ? err.push({ message: 'Passwords do not match.' }) : console.log('Password match passed');
    // password length check
    password.length < 5 ? err.push({ message: 'Password is too short! (At least 5 characters)' }) : console.log('Password length passed');
    // check err array contents
    err.length > 0 ? res.render('register', {
        err,
        name,
        email,
        password,
        passwordConfirm
    }) : (User.findOne({ email: email })
            .then( user => {
                if (user) {
                    // If email is in use
                    err.push({ message: 'Email is already registered' });
                    res.render('register', {
                        err,
                        name,
                        email,
                        password,
                        passwordConfirm
                    })
                } else {
                    // If email is not in use
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    // Password encryption with Bcrypt
                    // Salt generation
                    bcrypt.genSalt(10, (err,salt) => // Hash generation
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash; // Setting the password to generated hash
                            newUser.save() // Saving hash to db
                            .then(user => {
                                req.flash('success_message', 'Successfully registered! You can now log in.')
                                res.redirect('/users/login') // Redirecting user to login page
                            })
                            .catch(err => console.log(err));
                    }))
                }
                
            })
    )
})

// Logout
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_message', 'Successfully logged out');
    res.redirect('/users/login')
})

module.exports = router;