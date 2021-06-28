const express = require('express');
const { encodeUrl,
       decodeUrl, 
       urlPath, 
       decodeAndRedirectLongUrl} = require('../controllers/url_shortener_service.controller');

// express route handler
const router = express.Router();

///End Points////////
router.post('/encode', encodeUrl);
router.post('/decode', decodeUrl);
router.get('/statistic/:code', urlPath);
router.get('/:code', decodeAndRedirectLongUrl);


module.exports = {
    routes: router
}