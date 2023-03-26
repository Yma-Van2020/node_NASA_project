const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const { loadPlanetsData } = require('./models/planets.model')

//check if there is a port specified in the env
const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://katelynvan152:nwMpAW8m9CwgHeGd@nasacluster.eexxvzn.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

//when connection to db success
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
})
//when connection fails
mongoose.connection.on('error', err => {
    console.error(err);
})

async function startServer(){
    //return promise
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    //start server
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });    
}

startServer();
