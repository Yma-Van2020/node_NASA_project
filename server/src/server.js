const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const { mongoConnect } = require('./services/mongo')

//check if there is a port specified in the env
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){
    //return promise
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    //start server
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });    
}

startServer();
