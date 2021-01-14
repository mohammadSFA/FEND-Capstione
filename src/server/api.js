const fetch = require('node-fetch')

const weatherbitKey = 'a5399f03d9e541e0b009904825f85e54'

const getLatLon = async (location)=>{
    const req = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=10&username=travellingapiapp`)
    try {
        const data = await req.json()
        console.log(data);
        const latlon = await {lat: data.geonames[0].lat, lon: data.geonames[0].lng}
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
        console.log(weatherData);
        return weatherData
    } catch (error) {
        console.log(error);
    }
}

const getPixabay = async (location) => {
    const imgFetch = await fetch(`https://pixabay.com/api/?key=19653548-3c423f2925b070067e1793b2a&q=${location}&image_type=photo`)
    const imgData = await imgFetch.json()
    const imgURL = await imgData.hits[0].webformatURL
    return await imgURL
}

async function apiRunner(location, departure, returnValue) {
    let object = {}

    const daysData = Client.getDays(departure, returnValue)
    const { daysAway, lengthOfTrip } = daysData

    getLatLon(location).then(({lat, lon}) => {
        if (daysAway < 16) {
            getWeather(lat, lon, daysAway).then((weatherData) => {
                object.temperature = weatherData
            })
        }
    })

}