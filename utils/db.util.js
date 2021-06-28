const mongoose = require('mongoose');
const config = require('../config');

///
const mongodbUrl = config.mongo_url

//Connect to MongoDB function
const connect = () => {
    mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connection successful'))
        .catch(err => console.log(err));
    //On connection error, log the message
    mongoose.connection.on('error', err => {
        console.log(`DB connection error : ${err.message}`);
    });
}


module.exports = { connect }