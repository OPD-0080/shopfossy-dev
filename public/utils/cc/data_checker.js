

const check_data = (storage, database) => {
    var prev_last_checkout_code, curr_last_checkout_code;
    return check(storage, database, prev_last_checkout_code, curr_last_checkout_code)

};
const push_data = (checker, database, stores) => {
    for (let i = checker + 1; i < database.length; i++) {
        const data = database[i];
        // updating storage by pushing data into storage
        stores.push(data);
    }
};
const sort_and_push_data_and_images = (storage, dataArray, imageArray, dumpStorage) => {
    let index = "", update_indicator = "";

    // clear data from dumpStorage first
    console.log("...FUNCTION :: DATA_CHECKER HANDLER :: PROCESSING TO CLEARING CACHE ..... : ", dumpStorage.length,);
    dumpStorage = [];
    console.log("...FUNCTION :: DATA_CHECKER HANDLER :: CLEARING CACHE STATUS ..... :", dumpStorage.length, 200);
    // ...
    if (dumpStorage.length == 0) { // dumpStorage is cleared,
        // push data into storage
            dataArray.forEach(profileData => {
                imageArray.forEach(imageData => {
                    if (profileData.email === imageData.email) {
                        const data = {profile: profileData, image: imageData}
                        /* always will push data into dumpSTorage from index 
                            since array is always constantly deleted
                        */
                        dumpStorage.push(data); 
                    }
                })
            });
        // ...
    }else {
        console.log("...FUNCTION :: DATA_CHECKER HANDLER :: ERROR IN CLEARING DUMP STORAGE........ :", 404);
    }
    console.log("Dump storage length ......:", dumpStorage.length);
    console.log("realTime storage length.....", storage.length);

    // check for update 
    if (dumpStorage.length !== storage.length) {
        console.log("...FUNCTION :: DATA_CHECKER HANDLER :: CHANGES IN SERVER MADE..... ", 200);

        if (storage.length == 0) {
            index = 0;
            update_indicator = "update";
        } else {
            index = storage.length;
            update_indicator = "update" // adding update indicator
        }

        console.log("index status........: ", index);
        // pushing data from the exact index of the data to avoid data duplication
        for (let i = index; i < dumpStorage.length; i++) {
            const serverData = dumpStorage[i];
            
            storage.push({...serverData, update_indicator})
        }
        
        console.log("...FUNCTION :: DATA_CHECKER HANDLER :: PROFILE UPDATED ........... :", storage.length);
        // ...
    }else {
        console.log("...FUNCTION :: DATA_CHECKER HANDLER ::  NO SERVER CHANGES .......");
    }
    // ...
};
function check(stores, database, prev_code, curr_code) {
    var prev_code, curr_code;
        // getting last data object in each arrays
        //stores.forEach(data => { return prev_code = data.checkout_code});
        //database.forEach(data => { return curr_code = data.checkout_code});
        prev_code = stores.length;
        curr_code = database.length;

        // comparing if both last data duplicate
        if (prev_code !== curr_code) {
            // find the data corresponding to the last data checkout_code in storage from data in database
            const data = database.find(data => data.id == prev_code);
            // ..
            // find the index of that last data from storage in data from database
            const index = database.indexOf(data);
            // ...
            console.log("...FUNCTION :: DATA_CHECKER HANDLER :: NEW UPDATE FOUND .....", 200);
            return index // returns -1 as true
        }else {
            return false;
        }
};

const month = () => {
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
const pushDataCacheAccordingToDay = (cache, serverRes) => {
    try {
        let index = "";
        (cache.length == 0) ? index = 0 : index = cache.length;

        for (let i = index; i < serverRes.length; i++) {
            const data = serverRes[i];
            
            cache.push(data)
        };

        console.log("DAY CACHE STORAGE AFTER DATA PUSH .......:",cache.length);

        return true
    } catch (err) {
        console.log("...FUNCTION :: DATA_CHECKER HANDLER :: Error in pushDataToCache function:", err);
        return false
    }
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

const sortDataAccordingToTime = (cache, today_cache, yesterday_cache) => {
    let today_dump_storage = [], yesterday_dump_storage = [];
    let D, Y, M, prev_M, prev_Y, prev_D, d;

    // get data date
    const todayDate = getDate().todayDate;
    const yesterdayDate = getDate().yesterdayDate;
    // ....

    // clearing cache for data upload
    today_dump_storage = []
    yesterday_dump_storage = []
    // ...
    cache.map(data => {
        if (yesterdayDate == data.profile.date_created) {
            //console.log("yesterday data found", data);
            // push data in cache
            yesterday_dump_storage.push(data);
            // ...
        }
        if (todayDate == data.profile.date_created) {
           // console.log("Today data found", data);
            // first push data into temp array 
            today_dump_storage.push(data);
            // ....
        }
       /* if ((todayDate !== data.profile.date_created) && (yesterdayDate !== data.profile.date_created)) {
            //console.log("other data found", data);
        } */
    });

    // pushing relevant data into todays and yesterday cache
    if (today_dump_storage.length > 0 || yesterday_dump_storage.length > 0) {
        const resp = pushDataCacheAccordingToDay(today_cache, today_dump_storage);
                    pushDataCacheAccordingToDay(yesterday_cache, yesterday_dump_storage);
        return resp;
    }
    // ...
}
const sortData = (storage, today_cache, yesterday_cache) => {
    // sort data according to time or date
    const sortStatus = sortDataAccordingToTime(storage, today_cache, yesterday_cache);
    return sortStatus;
//...
}

module.exports = { check_data, push_data, sort_and_push_data_and_images, sortData, month, sortDataAccordingToTime}