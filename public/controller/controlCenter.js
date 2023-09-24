const fs = require("fs").promises;
// FILE IMPORTATION
//const update_ui = require("../utils/cc/realTime_update");
const { select_data_all_from_table } = require("../utils/query_database");
const { tables, cc_jsonFolders } = require("../controller/settings");
const { sort_and_push_data_and_images, sortData, month, sortDataAccordingToTime } = require("../utils/cc/data_checker");
const { fs_fileExist, fs_createFile, Fs_WriteDataTo, fs_readFile, fs_readFileDir } = require("../utils/file_system");
// ....

let userLogs = [];
let realTime = [];
let RT_today = [], RT_yesterday = [], RT_others = [], dayCache = {};
const dumpStorage = [];

const fs_writeData_to = new Fs_WriteDataTo();


const controlCenter = async (req, res) => {
    console.log(req.params);
    // FILE SYSTEM SECTION
    let is_JSON_parent_folder_exist = await fs_readFileDir(`${cc_jsonFolders.pending}`);

    // ....
    try {
        //let ui = await update_ui(req);
        let ui, storage, ordered_storage, users_storage, userImages_storage;

        const checkoutRes = await select_data_all_from_table(tables.checkout);
        const orderedRes = await select_data_all_from_table(tables.ordered_items);
        const usersRes = await select_data_all_from_table(tables.users);
        const userImagesRes = await select_data_all_from_table(tables.images);

        storage = checkoutRes.rows;
        ordered_storage = orderedRes.rows;
        users_storage = usersRes.rows;
        userImages_storage = userImagesRes.rows;
        
        const container = {storage, ordered_storage, users_storage, userImages_storage};
        ui = {container}

            if (Object.keys(ui).length !== 0) {
                // ...
                // REALTIME SECTION
                    if (storage.length !== realTime.length) {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: REALTIME UPDATE.....", 200);
                        sort_and_push_data_and_images(realTime, storage, userImages_storage, dumpStorage);
                    }else {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: REALTIME UPDATE.....:", 400);
                    }
                // ....
                // CUSTOMER SECTION 
                    // user logs
                    if (users_storage.length !== userLogs.length) {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: USER LOGS UPDATE.......:", 200);
                        sort_and_push_data_and_images(userLogs, users_storage, userImages_storage, dumpStorage)
                    }else {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: USER LOGS UPDATE.......:", 404);
                    }
                    // ...
                // ...
                // NOTIFICATION SECTION

                // ...

                // making data global 
                res.locals.update = ui;
                res.locals.userLogs = userLogs;
                res.locals.realTime = realTime;
                // ...
                // write data temp storage using fs
                const fs_path = "./cc_tem_storage";
                const isExist = await fs_fileExist(fs_path);

                console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: FS CHECKING MKDIR FILE....");
                if (isExist == undefined) {
                    console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: MKDIR FILE FOUND......", 200);
                    console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: ....PROCESSING DATA .....");

                    // sort data according to time or date
                    const sortStatus = sortData(realTime, RT_today, RT_yesterday);
                    if (sortStatus) {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: DATA SORTED TO TIME ZONE...... :", 200);
                    }else {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: DATA SORTED TO TIME ZONE....... :", 404);
                    }
                    //...

                    // write data in json into tem storage
                    dayCache = {RT_today, RT_yesterday}
                    const fs_status = await fs_writeData_to.realTime(dayCache);
                    
                    if (fs_status == undefined) {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: FS WRITING DATA IN (JSON FORMAT) REALTIME..........", 200);
                    }else {
                        console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: FS WRITING DATA IN (JSON FORMAT) REALTIME..........", 404);
                    }
                    //fs_writeData("./cc_tem_storage/checkout.json", checkout); // for checkout
                    //fs_writeData("./cc_tem_storage/ordered_items.json", ordered_items); // for ordered_items
                    //fs_writeData("./cc_tem_storage/users.json", users); // for user logs
                    //fs_writeData("./cc_tem_storage/user_images.json", user_images); // for user images
                    // Rewrite data to tem storage after every 30 seconds
                        setInterval(async() => {
                            console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: FETCHING DATA FOR UPDATE FROM DATABASE.....");

                            const checkoutRes = await select_data_all_from_table(tables.checkout);
                            const orderedRes = await select_data_all_from_table(tables.ordered_items);
                            const usersRes = await select_data_all_from_table(tables.users);
                            const userImagesRes = await select_data_all_from_table(tables.images);


                            //let ui = await update_ui(req);
                            // sort and push data in array for realtime, userLogs,
                            sort_and_push_data_and_images(realTime, checkoutRes.rows, userImagesRes.rows, dumpStorage);
                            
                            // sort data according to time or date
                            const sortStatus = sortData(realTime, RT_today, RT_yesterday);
                            if (sortStatus) {
                                console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: DATA SORTED TO TIME ZONE...... :", 200);
                            }else {
                                console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: DATA SORTED TO TIME ZONE...... :", 404);
                            }
                            //...
                            // write data in json into tem storage
                            dayCache = {RT_today, RT_yesterday};
                            const fs_status = await fs_writeData_to.realTime(dayCache);
                    
                            if (fs_status == undefined) {
                                console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: FS WRITING DATA IN (JSON FORMAT) REALTIME..........", 200);
                            }else {
                                console.log("...GET_ROUTE :: CONTROL_CENTER HANDLER :: FS WRITING DATA IN (JSON FORMAT) REALTIME..........", 404);
                            }
                            //("./cc_tem_storage/checkout.json", checkout); // for realTime
                            //fs_writeData("./cc_tem_storage/ordered_items.json", ordered_items); // for ordered_items
                            // ...
                            console.log("server reloaded after 10 sec", 200);
                        }, 10000);
                    // ...*/
                    
                    // DATABASE SECTION
                   /* const cc_databaseRouterResp = await databaseRouter(req, res, is_JSON_parent_folder_exist);
                    console.log("zzzzzzzzz",cc_databaseRouterResp);
                    if (cc_databaseRouterResp) {
                        res.locals.databasePreview = 404; // send responds to UI with a message ''NOT'' to display empty page in submit router
                    }else {

                        
                        res.locals.databasePreview = 200;  // send responds to UI with a message to display empty page in submit router 
                    }*/
                    // ....
                }
                // ...
            }else {
                console.log("server unable to find ui data");
                // making data global 
                res.locals.update = ui;
                res.locals.userLogs = userLogs;
                res.locals.realTime = realTime;
                // ...
            }
            
            console.log(res.locals);


        res.render("controlCenter");
    } catch (error) {
        console.log(error);
        if (error.path.endsWith(fs_path)) {
            fs_createFile(fs_path);

            res.redirect("controlCenter")
        }
        res.render("500")
    }
};

const databaseRouter = async (req, res, JSONParentRes) => {
    let previewData = [];
    let msg = "";

    try {
        if (JSONParentRes.length == 0) {
            return true;
        }else {
            // Get data from pending folder dir 
            const JSON_pending_parent_folders = await fs_readFileDir(`${cc_jsonFolders.pending}`);
            const entryDefaultOptions = JSON.parse(await fs_readFile(`${cc_jsonFolders.default}`));
            console.log("....JSON PARENT FOLDERS....", JSON_pending_parent_folders, entryDefaultOptions);

            JSON_pending_parent_folders.forEach(async eachFolder => {
                // reading files and data from the json pending folder dir
                let JSON_data_pending_files = await fs_readFileDir(`${cc_jsonFolders.pending}/${eachFolder}`);
                const JSON_data_main = JSON.parse(await fs_readFile(`${cc_jsonFolders.pending}/${eachFolder}/mainData.json`));
                const JSON_data_des = JSON.parse(await fs_readFile(`${cc_jsonFolders.pending}/${eachFolder}/description.json`));
                // ....
                // switching coded company name with it real name
                const defaultOptionResp = entryDefaultOptions.find(option => { return option.id == eachFolder });
                // ...
                console.log("....JSON DATA PENDING FILES ......", JSON_data_pending_files, defaultOptionResp);
                // making JSON basic calculation
                const JSON_base_ref = 100;
                const remaining_data = JSON_base_ref - JSON_data_main.length;
                const used_data = JSON_base_ref - Number(remaining_data);
                // ...
                // getting data payload
                const data = {
                    category: JSON_pending_parent_folders,
                    company: defaultOptionResp.company,
                    JSON_main: JSON_data_main,
                    JSON_des: JSON_data_des,
                    JSON_used_data: used_data,
                    JSON_remaining_data: remaining_data,
                    JSON_total: JSON_base_ref
                };
                // ...
                previewData.push(data);
                msg = "opd"

            });
            //console.log(req.session.previewData);
            // ...
            console.log("ssss", previewData, msg);
            //return previewData
        }
    } catch (error) {
        console.log("ERROR IN DATABASE ROUTER.....",error);
    }
}





module.exports = controlCenter;