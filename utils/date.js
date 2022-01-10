export default function getDate(date) {

    // example of date provided as argument: 2009-11-16T09:05:53Z

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const year = date.slice(0, 4);
    const month = months[date.slice(5,6)];
    const day = date.slice(8,9);

    return `Joined on ${month} ${day}, ${year}`;
}