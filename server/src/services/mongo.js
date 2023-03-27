const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

//when connection to db success
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
})
//when connection fails
mongoose.connection.on('error', err => {
    console.error(err);
})

async function mongoConnect() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connection ready');
    } catch (err) {
        console.error('MongoDB connection error', err);
    }
}
async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}