const bodyParser = require("body-parser");

const tripLog = async function(location, imageURL, departure, returnValue, lengthOfTrip, weather) {
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
    const destination = document.createElement('h4')
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
    const triplength = document.createElement('h6')
    triplength.innerText = `Length of stay: ${lengthOfTrip} days`

    const weatherText = document.createElement('h6')
    // Weather, passed through an if statement in case weather is not given (when daysAway is greater than 16)
    if (weather || weather == 0) {
        weatherText.innerText = `Weather: ${weather} degrees Celcius`
    } else {
        weatherText.innerText = `Weather information for this trip does not exist`
    }

    // Appending elements to their corresponding parents
    infoDiv.appendChild(destination)
    infoDiv.appendChild(dates)
    infoDiv.appendChild(triplength)
    infoDiv.appendChild(weatherText)

    newDiv.appendChild(img)
    newDiv.appendChild(infoDiv)

    outputsBlock.appendChild(newDiv)
}

export { tripLog }