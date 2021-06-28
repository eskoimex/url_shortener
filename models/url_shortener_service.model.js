const mongoose = require('mongoose')

// instantiate a mongoose schema
const URLSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortenedUrl: {
        type: String,
        required: true
    },
    shortenedUrlCode: String,
    date: {
        type: String,
        default: Date.now
    }
})

// create Url model from schema and export it
module.exports = mongoose.model('Url', URLSchema)