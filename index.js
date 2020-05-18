const express = require('express');

//Initialising app
const app = express();

//Routes
app.use('/', require('./routes/home'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));