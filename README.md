# Travel App
## Overview
This project is a single-page web app that lets the user choose a location, a departure and a return date for a trip, and then takes the input, passes the dates through a validation test, and makes a POST request to the server side that then makes a GET request to 3 seperate APIs. These requests are done in the order detailed below:

1. Location is passed through Geonames API to obtain the latitude and longitude of the location.
2. Latitude and longitude are passed through the Weatherbit API to obtain weather information, and from this information, the temperature is stored in an object.
3. Location is passed through the Pixabay API to obtain an image of the location, the URL of which is stored into the same object as above.
4. The object is sent back to the client-side, which then uses the obtained information to create a log.

## Extend Options Used
- Added end date and displayed length of trip
- Additional trips can be added

## Dependencies
- Webpack
- Webpack-CLI
- Webpack Dev Server
- NodeJS
- Node Package Manager
- Babel
- Materialize Framework
- Express
- Dotenv
- Cors
- Body-parser
- Node-fetch
- Clean-webpack-plugin
- Jest
- Mini-css-extract-plugin

