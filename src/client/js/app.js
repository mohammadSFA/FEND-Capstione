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

    // Test to see if date input is valid
    if (Client.checkDate(departure, returnValue)) {
        const daysData = Client.getDays(departure, returnValue)
        const { daysAway, lengthOfTrip } = daysData

        apiPostData(`http://localhost:8001/api`, {location: location, daysAway: daysAway})
        .then((value)=>{
            const { temperature, imgURL } = value
            
            // Run the tripLog function to log the trip on the webpage.
            if ( !temperature && temperature !== 0) {
                Client.tripLog(location, imgURL, departure, returnValue, lengthOfTrip)
            } else {
                Client.tripLog(location, imgURL, departure, returnValue, lengthOfTrip, temperature)
            }
        })
    } else {
        // If invalid, return error
        alert('Error: Invalid date inputted')
    }
}

export { appRunner, apiPostData }


document.addEventListener('DOMContentLoaded', ()=> {
    document.getElementById('submit').addEventListener('click', appRunner)
})