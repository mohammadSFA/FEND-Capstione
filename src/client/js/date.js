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

export { getDays }