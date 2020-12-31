const weatherbitKey = 'a5399f03d9e541e0b009904825f85e54'

const getLatLon = async (location)=>{
    const req = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=10&username=travellingapiapp`)
    try {
        const data = await req.json()
        console.log(data);
        let latlon = {lat: data.geonames[0].lat, lon: data.geonames[0].lng}
        return latlon
    } catch (error) {
        console.log("error", error);
    }
}

// Find Date: Subtract current timestamp - 1 day timestamp by (received date timestamp). 
// Or convert timestap into whole days, using math.floor, then if days are larger than specific number, make a call for now or later.
function getDays(departure, returnValue) {
    // Current time
    const now = new Date()

    // Departue and return times
    const departureDate = new Date(departure)
    const returnDate = new Date(returnValue)

    // Unix Timestamp (in milliseconds)
    const nowUnix = now.getTime()
    const departureDateUnix = departureDate.getTime()
    const returnDateUnix = returnDate.getTime()

    // Unix Timestamp converted into days (ignoring remainder)
    const today = Math.floor(nowUnix / (1000 * 60 * 60 * 24))
    const departureDay = Math.floor(departureDateUnix / (1000 * 60 * 60 * 24))
    const returnDay = Math.floor(returnDateUnix / (1000 * 60 * 60 * 24))

    // Finally, subtract the two to find how many days until the flight departure, and length of trip
    const daysAway = departureDay - today
    const lengthOfTrip = returnDay - departureDay
    const days = {daysAway, lengthOfTrip}
    return days
}

const getWeather = async (lat, lon, days)=>{
    const req = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${weatherbitKey}&days=${days}`)
    try {
        const data = await req.json()
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
}

function appRunner(event) {
    event.preventDefault()
    const location = document.getElementById('location').value
    const departure = document.getElementById('departure').value
    const returnValue = document.getElementById('returnDate').value

    const daysData = getDays(departure, returnValue)

    getLatLon(location)
    .then((latlon)=>{
        if (daysData.daysAway <= 16) {
            getWeather(latlon.lat, latlon.lon, daysData.daysAway)

        }
    })

}

export { getLatLon, getWeather, getDays, appRunner }



document.getElementById('submit').addEventListener('click', appRunner)