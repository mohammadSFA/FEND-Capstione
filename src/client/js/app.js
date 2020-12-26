
const getLatLon = async (location)=>{
    const req = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=10&username=travellingapiapp`)
    try {
        const data = await req.json()
        const latlong = {lat: data.geonames[0].lat, long: data.geonames[0].lng}
        console.log(latlong);
        return latlong
    } catch (error) {
        console.log("error", error);
    }
}

// Find Date: Subtract current timestamp - 1 day timestamp by (received date timestamp). 
// Or convert timestap into whole days, using math.floor, then if days are larger than specific number, make a call for now or later.

export { getLatLon }

getLatLon("London")