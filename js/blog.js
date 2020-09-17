const copy = document.querySelector(`.post__date`);
const date = new Date(Date.now());
const weekday = new Intl.DateTimeFormat(`en-Us`, {
    weekday: `long`,
}).format(date);
const month = new Intl.DateTimeFormat(`en-Us`, {
    month: `long`,
}).format(date);
const day = new Intl.DateTimeFormat(`en-Us`, {
    day: `numeric`,
}).format(date);
const year = new Intl.DateTimeFormat(`en-Us`, {
    year: `numeric`,
}).format(date);
// const time = new Intl.DateTimeFormat(`en-Us`, {
//     hour: `numeric`,
//     minute: `numeric`,
// }).format(date);


const setDayOrdinal = (number) => {
    let selector;
    if (number <= 0) {
        selector = 4;
    } else if ((number > 3 && number < 21) || number % 10 > 3) {
        selector = 0;
    } else {
        selector = number % 10;
    }
    return number + ['th', 'st', 'nd', 'rd', ''][selector];
};
const dayWithOrdinal = setDayOrdinal(day);


const formattedDate = `${weekday}, ${month} ${dayWithOrdinal} ${year}`;
copy.innerText = formattedDate;