# url_shortener
Shortens URL and redirects to original URl


# To run the code
- clone the code and install dependencies in the package.json file.
- run the command npm install.
- get the .env file from the zip folder.
- use mongodb compass as memory.
- enter the command npm start.

- There are four end points.
   - POST /encode [Parameter originalUrl] - encodes the originalUrl to a shortenedUrl. 
   - POST /decode [Parameter shortenedUrl] - decodes a shortenedUrl to it's originalUrl.
   - GET /statistic/:code [Parameter shortenedUrlCode]- returns basic statistics of the shor Url path.
   - GET /:code [Parameter shortenedUrlCode] - redirects to originalUrl.

# To run test 
- enter the command npm test
- it runs the test for three required end points.
   - POST /encode 
   - POST /decode 
   - GET /statistic/:code 
