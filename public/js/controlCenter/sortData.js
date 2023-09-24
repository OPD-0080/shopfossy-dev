
function month() {
    var date = new Date();
        var monthArray = new Array();
            monthArray[0] = "Jan";
            monthArray[1] = "Feb";
            monthArray[2] = "Mar";
            monthArray[3] = "Apr";
            monthArray[4] = "May";
            monthArray[5] = "Jun";
            monthArray[6] = "Jul";
            monthArray[7] = "Aug";
            monthArray[8] = "Sep";
            monthArray[9] = "Oct";
            monthArray[10] = "Nov";
            monthArray[11] = "Dec";
        var monthVal = monthArray[date.getMonth()];
        var hour_state = "";
        (date.getHours() >= 12) ? (hour_state = "pm") : ( hour_state = "am");

        const data = {
            m: monthVal,
            h: hour_state
        }
        return data
}

function getDate() {
    // get current date
    const current_date = new Date();
    let da = current_date.getDate();
    M = month().m;
    Y = current_date.getFullYear();
    D = da - 1; // for yesterday 

    // make them a string type
    (`${da}`.length == 1) ? d = `0${da}` : d = da ;

    const yesterdayDate = `${M} ${D},${Y}`;
    const todayDate = `${M} ${d},${Y}`;

    return ({yesterdayDate, todayDate})
    // ....
}



export { month }