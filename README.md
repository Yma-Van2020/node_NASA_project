# NASA Mission Control Project

This app allows users to schedule a mission launch for interstellar travel to one of the Kepler
Exoplanets. It features a rocket mission control platform where users can launch, abort, and view
upcoming and historical launches. The project demonstrates knowledge of NodeJs, React, and their
related frameworks and librari

Keep in mind that we recommend you code along with us and use this only if you ever get stuck or you don't like to code along.

## Getting Started

1. Ensure you have Node.js installed.
2. Create a free [Mongo Atlas](https://www.mongodb.com/atlas/database) database online or start a local MongoDB database.
3. Create a `server/.env` file with a `MONGO_URL` property set to your MongoDB connection string.
4. In the terminal, run: `npm install`

## Running the Project

1. In the terminal, run: `npm run deploy`
2. Browse to the mission control frontend at [localhost:8000](http://localhost:8000) and schedule an interstellar launch!

## Docker

1. Ensure you have the latest version of Docker installed
2. Run `docker build -t nasa-project .`
3. Run `docker run -it -p 8000:8000 nasa-project`

## Running the Tests

To run any automated tests, run `npm test`. This will: 
* Run all the client-side tests: `npm test --prefix client`
* Run all the server-side tests: `npm test --prefix server` 
