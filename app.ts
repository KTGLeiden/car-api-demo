// app.js
import express = require('express');
import * as bodyParser from 'body-parser';
const car = require('./routes/car.route'); // Imports routes for the products

// initialize our express app
const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use('/cars', car);
let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
