//this will have all the express codes
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const api = require('./routes/api');
const app = express();

//production ready and secure
app.use(cors({
    origin: 'http://localhost:3000'
}));

//for the logs
app.use(morgan('combined'));

//middlewares
app.use(express.json());

//use version 1 of the api as middleware
app.use('/v1', api);

module.exports = app;