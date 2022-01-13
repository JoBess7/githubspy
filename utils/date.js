const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getDate(date) {

    // example of date provided as argument: 2009-11-16T09:05:53Z

    const year = date.slice(0, 4);
    const month = months[date.slice(5,6)];
    const day = date.slice(8,9);

    return `Joined on ${month} ${day}, ${year}`;
}

function getMonthOrder(data) {
    var orderedMonths = [];

    for(var i = 0; i < data.contributions.length; i++) {
        let month = parseInt(data.contributions[i][0].date.slice(5,7));
        
        if(!(orderedMonths.includes(months[month-1].slice(0,3))))
            orderedMonths.push((months[month-1].slice(0,3)));
    }

    return orderedMonths;
}

function getParsedDate(date) {
    var str = "";

    var month = date.slice(5,7);
    var currentMonth = parseInt(month);

    str += months[currentMonth-1].slice(0,3);
    str += ' ';
    str += parseInt(date.slice(8,10)).toString();
    str += ', ';
    str += date.slice(0,4);

    return str;
}


export {getDate, getMonthOrder, getParsedDate};