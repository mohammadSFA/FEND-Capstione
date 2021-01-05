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

const getPixabay = async (location) => {
    const imgFetch = await fetch(`https://pixabay.com/api/?key=19653548-3c423f2925b070067e1793b2a&q=${location}&image_type=photo`)
    const imgData = await imgFetch.json()
    const imgURL = imgData.hits[0].webformatURL
    return imgURL
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

    const daysData = Client.getDays(departure, returnValue)

    getLatLon(location)
    .then((latlon)=>{
        getPixabay(location)
        if (daysData.daysAway <= 16) {
            getWeather(latlon.lat, latlon.lon, daysData.daysAway)
        }
    })

}

export { getLatLon, getWeather, appRunner }



document.getElementById('submit').addEventListener('click', appRunner)