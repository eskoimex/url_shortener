'use strict';
const { handleResError } = require("../utils/err.util");
const { encodeOriginalUrl,
        decodeShortenedUrl, 
        displayShortUrlStat, 
        redirectToLongUrl } = require("../functions/url_shortener_service.function");

// executes encodeOriginalUrl function from the functions module
const encodeUrl = async (req, res, next) => {
    try {
        await encodeOriginalUrl(req, res);
    } catch (e) {
        handleResError(res, e, res.statusCode);
    }
};


// executes decodeShortenedUrl function from the functions module
const decodeUrl = async (req, res, next) => {
    try {
        await decodeShortenedUrl(req, res);
    } catch (e) {
        handleResError(res, e, res.statusCode);
    }
};


// executes displayShortUrlStat function from the functions module
const urlPath = async (req, res, next) => {
    try {
        await displayShortUrlStat(req, res);
    } catch (e) {
        handleResError(res, e, res.statusCode);
    }
};

// executes redirectToLongUrl function from the functions module
const decodeAndRedirectLongUrl = async (req, res, next) => {
    try {
        await redirectToLongUrl(req, res);
    } catch (e) {
        handleResError(res, e, res.statusCode);
    }
};


//export the fucntions
module.exports = { 
                   encodeUrl, 
                   decodeUrl, 
                   urlPath, 
                   decodeAndRedirectLongUrl 
                }