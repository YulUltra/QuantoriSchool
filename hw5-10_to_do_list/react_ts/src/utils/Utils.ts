export function datesAreEqual(date1: Date, date2: Date): boolean {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

export function stringifyDate(date: Date): string {
    const [result] = date.toISOString().split("T");
    return result;
}

export function formatDate(dateLikeString: string) {
    if (dateLikeString === "") {
        return dateLikeString;
    }
    const date = new Date(dateLikeString);
    const today = new Date();
    const dayOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const month = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let formattedDate;
    if (datesAreEqual(date, today)) {
        formattedDate = "Today";
    } else if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() - today.getDate() === 1
    ) {
        formattedDate = "Tomorrow";
    } else {
        formattedDate = `${dayOfWeek[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`;
    }
    if (date.getFullYear() !== today.getFullYear()) {
        formattedDate = `${formattedDate}, ${date.getFullYear()}`;
    }
    return formattedDate;
}
