export function checkDate(departure, returnValue) {
    console.log(':: Testing the Date :: ' + departure + '  ' + returnValue);
    // Regex that checks if input matches date format
    let regex = RegExp('(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])')

    if (regex.test(departure) && regex.test(returnValue)) {
        // If passed, then check if returnValue is larger than departure, and if departure is larger than current date
        console.log(':: RegEx passed ::');
        const now = (new Date()).getTime()
        const departureDate = (new Date(departure)).getTime()
        const returnDate = (new Date(returnValue)).getTime()
        // For invalid dates such as 30 Feb, this should still work because when the .getTime() method is passed on it,
        // it returns NaN which will fail the if conditional test. 
        if (returnDate > departureDate && departureDate > now) {
            console.log(':: Test Passed ::');
            return true
        } else {
            return false
        }
    } else {
        return false 
    }
}