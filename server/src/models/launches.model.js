
const launchesDatabase = require('./launches.mongo');
const planets = require("./planets.mongo");
const DEFAULT_FLIGHTNUM = 100;

const launch = {
    flightNumber: 100,
    mission:'Kepler Explotation X',
    rocket: 'explorer-x1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customers: ['NASA', 'ZTM'],
    upcoming: true,
    success: true
};

saveLaunch(launch);

async function getAllLaunches() {
    return await launchesDatabase
        .find({},{
            '_id': 0,
            '__v':0
        })
}

//save a launch assuming all the properties already set
async function saveLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target
    })
    
    if(!planet) {
        throw new Error('No matching planet found')
    }

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
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        flightNumber: newFlightNumber,
        success: true,
        upcoming: true,
        customers: ['NASA', 'ZTM'],
    })
    await saveLaunch(newLaunch);

} 

async function existsLaunchWithId(launchId){
    return await launchesDatabase.findOne({
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
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
};