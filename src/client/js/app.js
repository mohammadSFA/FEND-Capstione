async function apiGet(location, daysAway) {
    const req = await fetch(`localhost:8001/api?location=${location}&daysAway=${daysAway}`)
    try {
        const apiData = await req.json()
        console.log(apiData);
        return apiData
    } catch (error) {
        console.log(error, 'error');
    }
}

function appRunner(event) {
    event.preventDefault()
    const location = document.getElementById('location').value
    const departure = document.getElementById('departure').value
    const returnValue = document.getElementById('returnDate').value

    const daysData = Client.getDays(departure, returnValue)
    const { daysAway, lengthOfTrip } = daysData

    apiGet(location, daysAway).then((obj)=>{
        const { temperature, imgURL } = obj
        if (temperature || temperature == 0) {
            Client.tripLog(location, imgURL, departure, returnValue, lengthOfTrip, temperature)
        } else {
            Client.tripLog(location, imgURL, departure, returnValue, lengthOfTrip)
        }
    })
}

export { appRunner, apiGet }



document.getElementById('submit').addEventListener('click', appRunner)