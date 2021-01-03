// Declaring Global Constants
const outputsBlock = document.getElementById('outputs-block')

function tripLog(location, imageURL, weather, departure, returnValue, lengthOfTrip) {
    // Create Div that contains the trip log
    const newDiv = document.createElement("div");
    newDiv.classList.add('trip-log')

    // Create Child Elements (image, information (location, weather, departure date, return date, length of stay)) inside the created div
    const img = document.createTextNode(`<img src= "${imageURL}" class= "img">`)
    const infoDiv = document.createElement("div")

    // Within infoDiv, create elements for location, weather, departure date, return date, and length of stay
    const destination = document.createElement('h3')
    destination.innerText = `Your trip to ${location}`

    // Departure and return, made into an unordered list
    const dates = document.createElement('ul')
    const departureDate = document.createElement('li')
    departureDate.innerText = `Departing on ${departure}`
    const returnDate = document.createElement('li')
    returnDate.innerText = `Returning on ${returnValue}`
    dates.appendChild(departureDate)
    dates.appendChild(returnDate)


}