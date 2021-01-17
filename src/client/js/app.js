async function apiPostData(url = '', data = {}) {
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
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

    apiPostData(`http://localhost:8001/api`, {location: location, daysAway: daysAway})
    .then((obj)=>{
        const { temperature, imgURL } = obj
        if (temperature || temperature == 0) {
            Client.tripLog(location, imgURL, departure, returnValue, lengthOfTrip, temperature)
        } else {
            Client.tripLog(location, imgURL, departure, returnValue, lengthOfTrip)
        }
    })
}

export { appRunner, apiPostData }



document.getElementById('submit').addEventListener('click', appRunner)