
const date_time = () => {
    var date = new Date();
        var hours = new Array();
            hours[13] = "01";
            hours[14] = "02";
            hours[15] = "03";
            hours[16] = "04";
            hours[17] = "05";
            hours[18] = "06";
            hours[19] = "07";
            hours[20] = "08";
            hours[21] = "09";
            hours[22] = "10";
            hours[23] = "11";
            hours[24] = "12";
        var sys_hr = hours[date.getUTCHours()];
        var hour_state = "";
        (date.getHours() >= 12) ? (hour_state = "pm") : ( hour_state = "am");

        const data = {
            HR: sys_hr,
            SS: hour_state
        }
        return data
}
export { date_time }