const bodyParser = require("body-parser");

function tripLog(location, imageURL, weather, departure, returnValue, lengthOfTrip) {
    const outputsBlock = document.getElementById('outputs-block')

    // Create Div that contains the trip log
    const newDiv = document.createElement("div");
    newDiv.classList.add('trip-log')

    // Create Child Elements (image, information (location, weather, departure date, return date, length of stay)) inside the created div
    const img = document.createElement("img")
    img.setAttribute('src', imageURL)
    const infoDiv = document.createElement("div")

    // Within infoDiv, create elements for location, weather, departure date, return date, and length of stay
    // Destination
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

    // Length of stay
    const triplength = document.createElement('h5')
    triplength.innerText = `Length of stay: ${lengthOfTrip} days`

    // Weather
    const weatherText = document.createElement('h4')
    weatherText.innerText = `Weather: ${weather} degrees Celcius`

    // Appending elements to their corresponding parents
    infoDiv.appendChild(destination)
    infoDiv.appendChild(dates)
    infoDiv.appendChild(triplength)
    infoDiv.appendChild(weatherText)

    newDiv.appendChild(img)
    newDiv.appendChild(infoDiv)

    outputsBlock.appendChild(newDiv)
}