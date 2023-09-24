// IMPORTATION OF FILE 
import { fetch_realTime_data } from "../../utils/cc/fetchAPI.js";
import { month } from "./sortData.js";
import { encodeData, decodeData } from "./encode_decode_data.js";
import { Store } from "./storageData.js";
import { pushDataIntoCache } from "./pushData.js";
import { UI } from "./display.js";
import { notification } from "./notification.js";
// ....
let cache_realtime = [];
let today_cache = [];
let yesterday_cache = [];

class CheckData {
    async realtime() {
        const res = await fetch_realTime_data();
        return res
    }
}
let checkData = new CheckData();
const store = new Store();
let display = new UI();

const realTime = async () => {
    try {
        let data, isDataStored, decryptedData, storedData, dataEncrypted;
        /*
            1. When content load for the first time, load data from json and
            2. Display the result in DOM
        */
        console.log("Fetching data from server....");
            data = await checkData.realtime();

            console.log("Data Fetching completed...");
            if (data.RT_today.length !== today_cache.length) {
                console.log("Pushing Data into Cache Array....");

                const dataRes = pushDataIntoCache(today_cache, data.RT_today);
                console.log("PUSH DATA RESPONDS..... :", dataRes, today_cache);


            }else {
                console.log("No Realtime update");
            }
            //console.log("GET CACHE STORAGE:", today_cache);

            // display content in DOM 
                display.today_realTime(today_cache);
                display.yesterday_realTime(yesterday_cache);
            // ...
            // check for update of data for notification sake
            notification(today_cache, data)
            // ...
        // check data again after every 30 seconds for update
            setInterval(async() => {
                const serverData = await checkData.realtime();

                console.log("Data Fetching completed...", serverData);
                if (serverData.RT_today.length !== today_cache.length) {
                    console.log("Pushing Data into Cache Array....");

                    const dataRes = pushDataIntoCache(today_cache, serverData.RT_today);
                    console.log("PUSH DATA RESPONDS..... :", dataRes, today_cache);

                    // display content in DOM 
                        display.today_realTime(today_cache);
                        display.yesterday_realTime(yesterday_cache);
                    // ...
                    // check for update of data for notification sake
                    notification(today_cache, data)
                    // ...
                }else {
                    console.log("No Realtime update");
                }
                // ...
                console.log("Reloading server .....", 200);
            }, 13000);
        // ...

    } catch (error) {
        console.log("Error in realtime update: ", error);
    }

}


realTime()
