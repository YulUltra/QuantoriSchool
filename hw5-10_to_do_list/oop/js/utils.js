function datesAreEqual(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

function stringifyDate(date) {
    const [result] = date.toISOString().split('T')
    return result
}