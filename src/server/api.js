const fetch = require('node-fetch')
const dotenv = require('dotenv')
dotenv.config()

const weatherbitKey = process.env.WEATHERBIT_KEY
const geonamesUser = process.env.GEONAMES_USER
const pixabayKey = process.env.PIXABAY_KEY

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

const getPixabay = async (location) => {
    const imgFetch = await fetch(`https://pixabay.com/api/?key=${pixabayKey}a&q=${location}&image_type=photo`)
    const imgData = await imgFetch.json()
    const imgURL = await imgData.hits[0].webformatURL
    console.log(imgURL);
    return await imgURL
}

async function apiRunner(location, daysAway) {
    const obj = { temperature, imageURL }

    getLatLon(location).then(({lat, lon}) => {
        if (daysAway < 16) {
            getWeather(lat, lon, daysAway).then((weatherData, obj) => {
                console.log(weatherData);
                obj[temperature] = weatherData
            })
        }
    })

    getPixabay(location).then((imgURL, obj)=> {
        obj[imageURL] = imgURL
    })

    console.log(obj);
    return obj
}

module.exports = { apiRunner }