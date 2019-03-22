// app.js
import express = require('express');
const car = require('./routes/car.route'); // Imports routes for the products

// initialize our express app
const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/cars', car);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
