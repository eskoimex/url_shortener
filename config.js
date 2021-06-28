'use strict';

const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
    NAME,
    PORT,
    HOST,
    HOST_URL,
    MONGODB_URL,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');

module.exports = {
    name: NAME,
    port: PORT,
    host: HOST,
    host_url: HOST_URL,
    mongo_url: MONGODB_URL
}