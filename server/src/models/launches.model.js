
const launchesDatabase = require('./launches.mongo');
const planets = require("./planets.mongo");
const DEFAULT_FLIGHTNUM = 100;
const axios = require('axios');

const launch = {
    flightNumber: 100, //flight_number
    mission:'Kepler Explotation X',
    rocket: 'explorer-x1', //rocket.name
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: true,
    success: true
};

saveLaunch(launch);

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
    console.log('Downloading launch data...');
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
            pagination: false,
            populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        'customers': 1
                    }
                }
            ]
        }
    });

    if(response.status !== 200){
        console.log('problem downloading launch data');
        throw new Error('Launch data download fail');
    }

    const launchDocs = response.data.docs;
    for(const launchDoc of launchDocs){
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers'];
        })
        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        };

        //populate launches collection
        await saveLaunch(launch);
    }
}
async function loadLaunchData(){
    await populateLaunches();
}

async function getAllLaunches() {
    return await launchesDatabase
        .find({},{
            '_id': 0,
            '__v':0
        })
        .sort({ flightNumber: 1 })
}

//save a launch assuming all the properties already set
async function saveLaunch(launch){
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    })
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        //sort from highest to lowest flightNum
        .sort('-flightNumber');

    if(!latestLaunch){
        return DEFAULT_FLIGHTNUM;
    }
    return latestLaunch.flightNumber;
}

async function addNewLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    })
    
    if(!planet) {;
        throw new Error('No matching planet found');
    }
    
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        success: true,
        upcoming: true,
        customers: ['NASA', 'ZTM'],
    })
    await saveLaunch(newLaunch);

};

async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
}

async function existsLaunchWithId(launchId){
    return await findLaunch({
        flightNumber: launchId
    })
}

async function abortLaunchById(launchId) {
    //return some val from mongo
    const aborted =  await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });
    return aborted.modifiedCount === 1;
}

module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
};
