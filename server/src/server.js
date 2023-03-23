const http = require('http');
const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model')

//check if there is a port specified in the env
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer(){
    await loadPlanetsData();

    //start server
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    });    
}

startServer();
