const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

//Connection string
const db = require('./config/keys').MongoURI;

//Connecting to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.log(err));


//Initialising app
const app = express();

//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/home'));
app.use('/users', require('./routes/users'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));