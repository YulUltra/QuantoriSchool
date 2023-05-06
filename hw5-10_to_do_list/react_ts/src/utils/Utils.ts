export function datesAreEqual(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
}

export function stringifyDate(date: Date): string {
    const [result] = date.toISOString().split('T')
    return result
}