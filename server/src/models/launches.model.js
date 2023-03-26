const launches = new Map();
const launces = require
let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission:'Kepler Explotation X',
    rocket: 'explorer-x1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['NASA', 'ZTM'],
    upcoming: true,
    success: true
};

//passing data to the launches map
launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    //convert to array
    return Array.from(launches.values());
}

function addNewLaunch(launch){
    latestFlightNumber++;
    //adds the launch object to the launches map using the set() method
    launches.set(
        latestFlightNumber, 
        //creates a new object that is a copy of launch with additional properties and values specified in the second argument
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ['ZTM', 'NASA'],
            flightNumber: latestFlightNumber
        })
    );
} 

function existsLaunchWithId(launchId){
    //check whether a particular key exists in the Map
    console.log(typeof launchId, launches)
    return launches.has(launchId);
}

function abortLaunchById(launchId) {
    //not doing launch.delete() here because want to keep the obj
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    addNewLaunch,
    abortLaunchById
};