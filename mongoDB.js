console.log('> initializing connection to database in MongoDB...')

// require('dotenv').config();
const mongoose = require('mongoose')

// conexión con server/cluster mongodb
    const connection = process.env.MONGODB_URI

let mongodb = mongoose.connect(connection)
    .then(() => console.log('\u2705 connection with MongoDB successful'))
    .catch(error => {
        console.log('\u274C error connecting to MongoDB:', error.message)
    });

module.exports = { mongodb }