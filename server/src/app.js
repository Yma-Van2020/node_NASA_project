//this will have all the express codes
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require("./routes/planets/planets.router")
const launchesRouter = require("./routes/launches/launches.router")

const app = express();

//production ready and secure
app.use(cors({
    origin: 'http://localhost:3000'
}));

//for the logs
app.use(morgan('combined'));

//middlewares
app.use(express.json());

app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);

module.exports = app;