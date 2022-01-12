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

    data.weeks.map((week) => {
        var currentMonth = parseInt(week.firstDay.slice(5,7));
        
        if(!(orderedMonths.includes(months[currentMonth-1]))) 
            orderedMonths.push(months[currentMonth-1]);
    });

    return orderedMonths.map((month) => month.slice(0,3));
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