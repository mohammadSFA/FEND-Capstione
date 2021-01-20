const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()

// API Keys
const weatherbitKey = process.env.WEATHERBIT_KEY
const geonamesUser = process.env.GEONAMES_USER
const pixabayKey = process.env.PIXABAY_KEY

// Geonames Call
const getLatLon = async (location)=>{
    const req = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=10&username=${geonamesUser}`)
    try {
        const data = await req.json()
        const latlon = await {lat: data.geonames[0].lat, lon: data.geonames[0].lng}
        console.log(latlon);
        return await latlon
    } catch (error) {
        console.log("error", error);
    }
}

// Weatherbit Call
const getWeather = async (lat, lon, days)=>{
    const daysAdjusted = days + 1
    const req = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${weatherbitKey}&days=${daysAdjusted}`)
    try {
        const data = await req.json()
        const weatherData = data.data[days].temp
        return await weatherData
    } catch (error) {
        console.log(error);
    }
}

// Pixabay Call
const getPixabay = async (location) => {
    const imgFetch = await fetch(`https://pixabay.com/api/?key=${pixabayKey}a&q=${location}&category=places&image_type=photo`)
    const imgData = await imgFetch.json()
    const imgURL = await imgData.hits[0].webformatURL
    console.log(imgURL);
    return await imgURL
}

// Function that combines all of the calls
async function apiRunner(location, daysAway) {
    // Empty array to store extracted data
    let arr = []

    // First and second promises, Geonames call combined with Weatherbit call
    let weatherCall = getLatLon(location).then(({lat, lon}) => {
        if (daysAway < 16) {
            return getWeather(lat, lon, daysAway)
        }
    })

    // Third promise, Pixabay call
    let imageCall = getPixabay(location)

    // Combine the promises
    return Promise.all([weatherCall, imageCall])
    .then((value)=> {
        // Check if temperature exists. This is done for many processes because it often depends on whether weather information is available.
        var obj = {}
        if (value.length == 2) {
            obj.location = location
            obj.temperature = value[0]
            obj.imgURL = value[1]
        } else if (value.length == 1) {
            obj.location = location
            obj.imgURL = value[0]
        }
        return obj
    })
}

module.exports = { apiRunner }