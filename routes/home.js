const express = require('express');
const router = express.Router();

//Home page
router.get('/', (req, res) => res.render('start'));

//Dashboard
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;