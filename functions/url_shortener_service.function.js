'use strict';

// import packages 
const { handleResSuccess } = require("../utils/success.util");
const { handleResError } = require("../utils/err.util");
const validUrl = require('valid-url')
const shortid = require('shortid')

//Import config module
const config = require('../config');

//import url_shortener_service model
const Url = require('../models/url_shortener_service.model');

const encodeOriginalUrl = async (req, res) => {

    // initialize err variable.
    let err;

    // Domain name
    const hostUrl = config.host_url || 'http://localhost:3000';

    // destructure the originalUrl from req.body.originalUrl
    const { originalUrl } = req.body

        // check base url if valid using the validUrl.isUri method
        if (!validUrl.isUri(hostUrl)) {
            err = {
                message: "Invalid Host URL",
            };
            handleResError(res, err, res.statusCode);
        }

        // if valid, we create the url code
        const shortenedUrlCode = shortid.generate()

        // check original url if valid using the validUrl.isUri method
        if (validUrl.isUri(originalUrl)) {
            try {
                //check if the long URL was in the DB, else it is created.
                let url = await Url.findOne({
                    originalUrl
                })

                // if url exist, return the response
                if (url) {
                    
                    //call the function that handles success message
                    handleResSuccess(res, "Original Url Already Exist", originalUrl, res.statusCode);

                } else {
                    // join the generated short url code the the host url
                    const shortenedUrl = hostUrl + '/' + shortenedUrlCode

                    // invoking the Url model and saving to the DB
                    url = new Url({
                        originalUrl,
                        shortenedUrl,
                        shortenedUrlCode,
                        date: new Date()
                    })
                    await url.save()

                    handleResSuccess(res, "Url Encoded And Saved Succesfully", shortenedUrl, res.statusCode);

                }
            }
            // exception handler
            catch (e) {
                console.log(e)
                err = {
                    message: "Server error, please contact the Admin.",
                };
                handleResError(res, err, res.statusCode);
            }
        } else {
            err = {
                message: "Invalid Original Url",
            };
            handleResError(res, err, res.statusCode)
        }
};


const decodeShortenedUrl = async (req, res) => {
  let err;  
        try {
            
            // destructure the shortenedUrl from req.body.originalUrl
            const { shortenedUrl } = req.body

            //check if the long URL was in the DB, else it is created.
            let url = await Url.findOne({
                shortenedUrl
            })

            if (url) {

                //handle succes message
               handleResSuccess(res, "Shortened Url Decoded Successfully", url.originalUrl, res.statusCode);

            } else {
                // else return a not found 404 status
                err = {
                    message: "Shortened Url Not Found.",
                };
                handleResError(res, err, res.statusCode);
            }

        }
        // exception handler
        catch (e) {
            console.log(e)
            err = {
                message: "Server error, please contact the Admin.",
            };
            handleResError(res, err, res.statusCode);        
        }
}


const displayShortUrlStat = async (req, res) => {
    let err;
    try {
        // find a document match to the shortenedUrlCode in req.params.code
        const url = await Url.findOne({
            shortenedUrlCode: req.params.code
        })
        if (url) {

            //handle success 
            handleResSuccess(res, "Shortened Url Statistics", url, res.statusCode);

        } else {
            // handle the error message
            err = {
                message: "No URL Found",
            };
            handleResError(res, err, res.statusCode);
        }

    }
    // exception handler
    catch (e) {
        console.log(e)
        err = {
            message: "Server error, please contact the Admin.",
        };
        handleResError(res, err, res.statusCode);
    }
}



const redirectToLongUrl = async (req, res) => {
    let err;
    try {

        // find a document match to the shortenedUrlCode in req.params.code
        const url = await Url.findOne({
            shortenedUrlCode: req.params.code
        })
        if (url) {

            // when valid we perform a redirect
            return res.redirect(url.originalUrl)

        }  else {
            // else return a not found 404 status
            err = {
                message: "Shortened Url Not Found.",
            };
            handleResError(res, err, res.statusCode);
        }

    }
    // exception handler
    catch (e) {
        console.log(e)
        err = {
            message: "Server error, please contact the Admin.",
        };
        handleResError(res, err, res.statusCode);
    }
}


//export functions
module.exports = {
    encodeOriginalUrl,
    decodeShortenedUrl,
    displayShortUrlStat,
    redirectToLongUrl
}