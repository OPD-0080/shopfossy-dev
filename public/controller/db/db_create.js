// REMINDER  TODO !!!
    /*   FOR CREATE
        1.  GET ALL DATA AND SORT THEM OUT (FOR UPLOAD IMAGES USE WEBP FORMAT)
        2.  CREATE A NEW TEMPORARY JSON STORAGE USING FILE SYSTEM MODULE
        3.  SAVE WRITE DATA IN TEMPORARY STORAGE JSON
        4.  REPLACE THE ORIGINAL JSON DATA WITH THE TEMPORARY JSON DATA WHEN ''SUBMIT'' BUTTON IS TRIGGERED 
            BUT NOTE
                FIRST READ THE JSONM FILE AND PUSH DATA AS OBJECT IN ARRAY
                THEN WRITE DATA AS ARRAY IN JSON FORMAT FOR THE SECOND TIME
        5.  AFTER REPLACEMENT, DELETE DATA IN TEMPORARY JSON STORAGE FOR NEXT ENTRIES DATA
        
        FOR MODIFICATION 
        1. IN THE UI SESSION, SELECT TO SWITCH URL ROUTE 
    */
const {fs_fileExist, fs_copyData, fs_copyFileDir, fs_createFile, fs_readFile, fs_renameFile,
        fs_readFileDir, fs_writeData, fs_appendFile, fs_deleteFileFromDir, Fs_WriteDataTo,
        fs_writeData_with_flag_opt, /* fs_streamData_write, fs_streamData_read*/
    } = require("../../utils/file_system");
const { cc_sharpStorage, cc_jsonFolders } = require("../settings");
const moment = require("moment");
const month = require("../../utils/func_date");



const cc_sortUploadedImages = async (req, res, next) => {
    const data = req.body; serverImageArray = req.files;

    let check_des_parent_folder = `${cc_sharpStorage.pending}/${data.seller}`;
    let des_subFolder_main = `${cc_sharpStorage.pending}/${data.seller}/main`;
    let des_subFolder_sort = `${cc_sharpStorage.pending}/${data.seller}/sorting`;

    try {
        //console.log(".....CC DATABASE HANDLER IMAGES.......", req.files);
        //console.log("......CC DATABASE HANDLER DATA ......", req.body);

        // FOR 2nd SET OF UPLOADED IMAGES WHEN FOLDER IN DIR IS FOUND
        const isFolderExisted = await fs_readFileDir(check_des_parent_folder);
        if (isFolderExisted.length > 0) {
            console.log("....CC_DATABASE HANDLER::  PARENT FOLDER FOUND IN DIR ....", 200);
            console.log("....CC_DATABASE HANDLER :: PROCEED TO COPY AND PASTE DATA IN DIR ....");

            // read sorting folder to get data
            let sort_lastFolder = ""; 
            let sort_fs_readDir_resp = await fs_readFileDir(des_subFolder_sort); // read sort folder dir`
            sort_fs_readDir_resp = sort_fs_readDir_resp.sort((a, b) => {return a-b}); // arranging array in asending order
            sort_fs_readDir_resp.forEach(data => {return sort_lastFolder = data}); // getting the last data from dir.

            const sort_nextFolder = Number(sort_lastFolder) + 1; // increase value by 1 as the next folder name
            const sort_nexFolder_path = `${des_subFolder_sort}/${sort_nextFolder}`;
            await fs_createFile(sort_nexFolder_path); // create the next folder in SORTING dir
            const nextFolder_fs_readDir_resp = await fs_readFileDir(sort_nexFolder_path); // verying ithe next folder is created successfully  

            // copying uploaded data to the NEXT "MAIN" & "SORTING" folders 
            if (nextFolder_fs_readDir_resp.length == 0) {
                // copy paste data in sort next folder dir 
                await copyPasteData_sortingSubFolder(serverImageArray, sort_nexFolder_path);
                // ...
                // get the first image data from array
                const upload_firstData_path = `${serverImageArray[0].destination}`;
                const upload_fs_readDir_resp = await fs_readFileDir(upload_firstData_path);
                const main_fs_readDir_resp = await fs_readFileDir(des_subFolder_main);
                console.log(upload_fs_readDir_resp);

                // rename the first data in uploaded_images folder by increasing of length of main array
                const main_nextData_name = 1 + Number(main_fs_readDir_resp.length);
                // ...
                console.log("....CC_DATABASE HANDLER :: RENAMING IMAGE FILES INITIATED....");
                // renaming first data with a "FAKE", name of "f" in uploaded folder 
                const main_new_path = `${serverImageArray[0].destination}/${upload_fs_readDir_resp[0].replace(`${upload_fs_readDir_resp[0].slice(0, -5)}`, `f`)}`;
                const main_old_path = `${serverImageArray[0].destination}/${upload_fs_readDir_resp[0]}`;
                await fs_renameFile(main_old_path, main_new_path);
                // ...
                console.log("....CC_DATABASE HANDLER :: RENAME IMAGE FILES STATUS ....", 200);
                console.log("....CC_DATABASE HANDLER :: INITIATE COPY IMAGE FILES IN ''MAIN'' FOLDER DIR....");
                // copy the fake data from uploaded folder to the "MAIN" sorting folder dir
                await fs_copyData(`${serverImageArray[0].destination}/f.webp`, `${des_subFolder_main}/f.webp`);
                // ...
                console.log("....CC_DATABASE HANDLER :: COPY IMAGE FILES IN ''MAIN'' FOLDER DIR STATUS....", 200);
                console.log("....CC_DATABASE HANDLER :: INITIATE UNDO IMAGE FILES NAME MODIFICATION ....");
                // and then in the MAIN dir, rename the fake data back to the next name of the previous data name
                const is_rename_done = await fs_renameFile(`${des_subFolder_main}/f.webp`, `${des_subFolder_main}/${main_nextData_name}.webp`)
                // ...
                if (is_rename_done == undefined) {
                    // in the UPLOAD_IMAGES folder, rename the fake file back to the original name
                    await fs_renameFile(`${serverImageArray[0].destination}/f.webp`, `${serverImageArray[0].destination}/${serverImageArray[0].originalname}`);
                    // ...
                    console.log("....CC_DATABASE HANDLER :: UNDO IMAGE FILES NAME MODIFICATION STATUS....", 200);
                    // clear data in upload_image folder for the next.
                    setTimeout(() => {
                        deleteUploadFileFromDir(serverImageArray);
                        next() // MOVE TO THE NEXT MIDDLEWARE 
                    }, 2000);
                    // ...
                }
            }
        }
    } catch (err) {
        console.log(err);
        console.error("...CC_DATABASE HANDLER :::: (ERROR) IN SORT UPLOADED IMAGES FUNCTION :: cannot acesss file ....");

        // RESOLVING ERRORS WHEN SELLERS DIR FOLDER AND IT CONTENTS ARE EMPTY  (FOR THE FIRST TIME)
        if (err.path.endsWith(`${data.seller}`) && err.syscall == "scandir") {
            console.log("...CC_DATABASE HANDLER ::  CREATING CATEGORY FILE IN DIR ....");
            // crate category folder and then it sub_folders (MAIN & SORT)
            const isCategoryFolderCreated = await fs_createFile(check_des_parent_folder);
            if (isCategoryFolderCreated == undefined) {
                // check if created folder exists
                const parent_folder_resp = await fs_readFileDir(check_des_parent_folder);
                console.log("...CC_DATABASE HANDLER ::  PARENT FOLDER RESPONDS..", parent_folder_resp, 200);

                if (parent_folder_resp.length == 0) {
                    const sort_sub_sub_folder = `${des_subFolder_sort}/1`;
                    // create sub folder and sub_sub_folder in parent folder dir
                    await fs_createFile(des_subFolder_main); // for MAIN folder
                    await fs_createFile(des_subFolder_sort); // for SORTING folder
                    await fs_createFile(sort_sub_sub_folder); // for SORTING SUB_SUB_ folder
                    // ...
                    console.log(".....CC_DATABASE HANDLER::  MDKR FOLDERS ARE CREATED....", 200);
                    
                    // copying image files into "SORTING SUB SUB" folder
                    const isDataCopied = await copyPasteData_sortingSubFolder(serverImageArray, sort_sub_sub_folder);
                    if (isDataCopied == undefined) {
                        // rename image file with a fake name
                        const firstData_oldName = `${serverImageArray[0].destination}/${serverImageArray[0].originalname}`;
                        const firstData_newName = `${serverImageArray[0].destination}/${serverImageArray[0].originalname}`.replace(`${serverImageArray[0].originalname}`, "f.webp");
                        await fs_renameFile(firstData_oldName, firstData_newName);

                        // copying "FAKE" file to "MAIN" folder dir
                        await fs_copyData(`${serverImageArray[0].destination}/f.webp`, `${des_subFolder_main}/f.webp`);
                        // ...
                        // rename fake file back to the 1.webp as the the starting point
                        await fs_renameFile(`${des_subFolder_main}/f.webp`, `${des_subFolder_main}/f.webp`.replace("f.webp", "1.webp"));
                        //.. 
                        // In the UPLOAD IMAGE FOLDER, rename fake name back to original file name
                        const isFileNameRestored = await fs_renameFile(`${serverImageArray[0].destination}/f.webp`, `${serverImageArray[0].destination}/${serverImageArray[0].originalname}`);
                        // ...
                        // clear image files in UPLOADED folder after completion
                        if (isFileNameRestored == undefined) {
                            setTimeout(() => {
                                deleteUploadFileFromDir(serverImageArray);
                                next() // MOVE TO THE NEXT MIDDLEWARE 
                            }, 1500)
                        }
                    }
                    // ...
                }
                // ....
            }
            // ...`
        }
        // ....
    }
};
const cc_sortData = async (req, res) => {
    const data = req.body; const serverImageArray = req.files;
    
    
    let seller = "", serverData = {}, data_main = {}, data_des = {};
    let imgUrlArray = [], imgSorts = {}, data_id = "";
    let imgUrl = "", imgSort1 = "", imgSort2 = "", imgSort3 = "", imgSort4 = "", imgSort5 = "", imgSort6 = "";

    imgSorts = {imgUrl, imgSort1, imgSort2, imgSort3, imgSort4, imgSort5, imgSort6};
    try {
        console.log("......(NEXT MIDDLEWARE)  CC_DATABASE HANDLER DATA ......", req.body);
        
        // replacing 'SELLER' value with the company name
            seller = await replace_seller_value(data);
        // ...
            serverData = {data, seller} // wrap all in object
        // sorting data for "MAIN" dir
            data_main = await dataVariables_main(data_main, serverData, imgSorts, data_id);
        // ...
        // sorting data for "DESCRIPTION" dir
            data_des = await dataVariables_des(data_des, serverData, imgSorts, data_id);
        // ...
        // getting the "URL's" of the images in both "MAIN" and "SORTING" folder dir
            // read sorting folder dir to get last folder name
            let sorting_lastFolderName = "";
            const sorting_readFile_res = await fs_readFileDir(`${cc_sharpStorage.pending}/${data_des.sellerRef}/sorting/`);
            sorting_readFile_res.forEach(el => { return sorting_lastFolderName = el });
            // ...
            // Pushing in into new array
            serverImageArray.forEach(el => {
                const res = `${data_des.sellerRef}/sorting/${sorting_lastFolderName}/${el.originalname}`;
                imgUrlArray.push(res);
                
                return imgUrlArray;
            });
            // ...
            // sorting img urls and assigin them to thier respective parameters
            const urls = {imgUrl, imgSort1, imgSort2, imgSort3, imgSort4, imgSort5, imgSort6};
            imgSorts = await dataVariables_imgUrls(urls, imgUrlArray, data_main.sellerRef, sorting_lastFolderName);
            // ...
        // ...
        // using the last folder name from sorting dir as the ID
            data_id = sorting_lastFolderName;
        // ...
        // sorting data for "MAIN" dir for the Second Time
            data_main = await dataVariables_main(data_main, serverData, imgSorts, data_id);
            console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: UPLOADED DATA FOR ''MAIN JSON FILE''", data_main);
        // ...
        // sorting data for "DESCRIPTION" dir for the Second Time
            data_des = await dataVariables_des(data_des, serverData, imgSorts, data_id);
            console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: UPLOADED DATA FOR ''DES JSON FILE''",data_des);
            // ...
        // Writ sorted data as JSON file using FS
        console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: PROCEEDING TO WRITE DATA IN JSON FORMAT...");
    
            // check if parent folder exist in dir
            console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: CHECKING JSON PARENT FOLDER DIR STATUS......");
            const isParentFolderExist = await fs_readFileDir(`${cc_jsonFolders.pending}`);

            if (isParentFolderExist.length == 0 || isParentFolderExist.length > 0) {
                console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: JSON PARENT FOLDER DIR STATUS..", 200);
                console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: CHECKING JSON SUB_FOLDER DIR ......");
                // check if created folder exists
                const doesFolderExist = await fs_readFileDir(`${cc_jsonFolders.pending}/${data_main.sellerRef}`);
                // ...
                console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: JSON SUB_FOLDER DIR STATUS.....", doesFolderExist, 200);

                if (doesFolderExist.length == 0 || doesFolderExist.length > 0 ) {
                    console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: INITIATING WRITING OF DATA TO JSON FORMAT .....")
                    
                    // get previous data from JSON parent folder  and puhsing in incoming data in array
                    let previous_data_main = JSON.parse(await fs_readFile(`${cc_jsonFolders.pending}/${data.seller}/mainData.json`));
                    let previous_data_des = JSON.parse(await fs_readFile(`${cc_jsonFolders.pending}/${data.seller}/description.json`));
                    previous_data_main.push(data_main); //updating data 
                    previous_data_des.push(data_des); // updating data
                    // ....
                    // delete previous JSON file before writting a new one;
                    await fs_deleteFileFromDir(`${cc_jsonFolders.pending}/${data.seller}/mainData.json`);
                    await fs_deleteFileFromDir(`${cc_jsonFolders.pending}/${data.seller}/description.json`);
                    // ...
                    // write uploaed data in JSON format in respective folder dir
                    const isDataWritten_main = await fs_writeData_with_flag_opt(`${cc_jsonFolders.pending}/${data.seller}/mainData.json`, previous_data_main)
                    const isDataWritten_des = await fs_writeData_with_flag_opt(`${cc_jsonFolders.pending}/${data.seller}/description.json`, previous_data_des);
                    // ...
                    console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: WRITING DATA TO ''MAIN'' AND ''DES'' FOLDER DIR STATUS.....", isDataWritten_main, isDataWritten_des, 200);
                    
                    // redirect url back to GET ROUTE
                    res.redirect("/database/createData");
                    // ...
                }
            }
            // ...
        // ...
        

    } catch (error) {
        console.log(error);
        console.error("...CC_DATABASE HANDLER :::: (ERROR) IN SORT DATA FUNCTION :: cannot acesss file ....");
        
        // RESOLVING ERRORS WHEN SELLERS DIR FOLDER AND IT CONTENTS ARE EMPTY  (FOR THE FIRST TIME)
        if (error.path.endsWith(`${data.seller}`) && error.syscall == "scandir") {
            console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: CREATING CATEGORY FILE IN DIR ....");
            // crate category folder and then it sub_folders (MAIN & SORT)
            const isCategoryFolderCreated = await fs_createFile(`${cc_jsonFolders.pending}/${data.seller}`);
            // ...
            console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: CREATING CATEGORY FILE IN DIR STATUS ....", 200);
            
            if (isCategoryFolderCreated == undefined) {
                console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: CHECKING FOR SUB FOLDER .....")
                // check if created folder exists
                const doesFolderExist = await fs_readFileDir(`${cc_jsonFolders.pending}/${data.seller}`);
                // ...
                console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION ::  SUB FOLDER RESPONDS....", doesFolderExist, 200);

                if (doesFolderExist.length == 0) {
                    console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: INITIATING WRITING OF DATA TO JSON FORMAT .....")
                    
                    // wrapping data object in array
                    const pending_data_main = [data_main];
                    const pending_data_des = [data_des];
                    // ....
                    // write uploaed data in JSON format in respective folder dir (AS OBJECT WITHOUT ARRAY)
                    const isDataWritten_main = await fs_writeData_with_flag_opt(`${cc_jsonFolders.pending}/${data.seller}/mainData.json`, pending_data_main)
                    const isDataWritten_des = await fs_writeData_with_flag_opt(`${cc_jsonFolders.pending}/${data.seller}/description.json`, pending_data_des);
                    // ...
                    console.log("...CC_DATABASE HANDLER :: SORT_DATA FUNCTION :: WRITING DATA TO ''MAIN'' AND ''DES'' FOLDER DIR STATUS.....", isDataWritten_main, isDataWritten_des, 200);
                    



                    // redirect url back to GET ROUTE
                    res.redirect("/database/createData");
                    // ...
                }
            }
        }
    
    }
};
const submit_createData = async (req, res, next) => {
    console.log(".... PROCEEDING TO SUBMIT CREATE DATA ");

    try {
        const JSONParentFolders = await fs_readFileDir(`${cc_jsonFolders.pending}`);
        const backupParentFolders = await fs_readFileDir(`${cc_sharpStorage.pending}`);
        console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CHECKING FOR JSON FILE IN PARENT FOLDER DIR...", JSONParentFolders, backupParentFolders, 200); 
        // ...
        // getting data and time of submission of data
        const date = `${month().m}-${moment().format("DD-YYYY")}`;
        const time = `${moment().format("hh-mm-ss")}`;

        // ...
        // For JSON  backup section 
            for (let i = 0; i < JSONParentFolders.length; i++) {
                const eachFolder = JSONParentFolders[i];
                
                console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION ::  JSON FILE IN PARENT FOLDER DIR STATUS...", 200); 
                console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CHECKING FOR JSON BACKUP FOLDER..."); 
                // checking if backup sub folder exist
                const JSON_backup_folders = await fs_readFileDir(`${cc_jsonFolders.backup}`);
                // ...
                if (JSON_backup_folders.includes(eachFolder)) { //  if folder does exist
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: JSON BACKUP FOLDER STATUS...", 200); 
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CREATING JSON BACKUP SUB_FOLDERS..."); 

                    await fs_createFile(`${cc_jsonFolders.backup}/${eachFolder}/${date}-${time}`);

                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: JSON BACKUP SUB_FOLDERS STATUS...", 200); 
                    // pushing data into both backup folder and publish folder 
                    JSON_push_data_into_backup_and_publish_folder(eachFolder, date, time);
                    // ...
                }
                if (!JSON_backup_folders.includes(eachFolder)) { //  if folder does not exist
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: JSON BACKUP FOLDER STATUS...", 404); 
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CREATING ( JSON BACKUP AND ITS SUB FOLDERS )..."); 
                     // create backup folder is not exist and inside the folder create category folder for JSON data
                    await fs_createFile(`${cc_jsonFolders.backup}/${eachFolder}`);
                    await fs_createFile(`${cc_jsonFolders.backup}/${eachFolder}/${date}-${time}`);
                    // ...
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CREATING ( JSON BACKUP AND ITS SUB FOLDERS ) STATUS...", 200); 
                     // pushing data into both backup folder and publish folder 
                    JSON_push_data_into_backup_and_publish_folder(eachFolder, date, time);
                    // ...
                }
            }
        // ....
        //   For IMAGE  backup section 
            for (let i = 0; i < backupParentFolders.length; i++) {
                const eachFolder = backupParentFolders[i];

                console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CHECKING FOR PARENT IMAGE FOLDER DIR...", 200); 
                // checking if backup sub folder exist
                console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CHECKING FOR IMAGE BACKUP FOLDER..."); 
                const image_backup_folders = await fs_readFileDir(`${cc_sharpStorage.backup}`);
                // ...
                if (image_backup_folders.includes(eachFolder)) { //  if folder does exist
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: IMAGE BACKUP FOLDER STATUS...", 200); 
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CREATING IMAGE BACKUP SUB_FOLDERS..."); 

                    await fs_createFile(`${cc_sharpStorage.backup}/${eachFolder}/${date}-${time}`);
                    
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: IMAGE BACKUP SUB_FOLDERS STATUS...", 200); 
                    // pushing data into both backup folder and publish folder 
                    img_push_data_into_backup_and_publish_folder(eachFolder, date, time, cc_sharpStorage.pending, cc_sharpStorage.backup);
                    // ...
                }
                if (!image_backup_folders.includes(eachFolder)) { //  if folder does not exist
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: IMAGE BACKUP FOLDER STATUS...", 404); 
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CREATING ( IMAGE BACKUP AND ITS SUB FOLDERS )..."); 
                    // create backup folder is not exist and inside the folder create category folder for JSON data
                    await fs_createFile(`${cc_sharpStorage.backup}/${eachFolder}`);
                    await fs_createFile(`${cc_sharpStorage.backup}/${eachFolder}/${date}-${time}`);
                    // ...
                    console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: CREATING ( IMAGE BACKUP AND ITS SUB FOLDERS ) STATUS...", 200); 
                    // pushing data into both backup folder and publish folder 
                    img_push_data_into_backup_and_publish_folder(eachFolder, date, time, cc_sharpStorage.pending, cc_sharpStorage.backup);
                    // ...
                }


            }
        // ...
    } catch (error) {
        console.log("...CC_DATABASE :: SUBMIT ( CREATE DATA ) FUNCTION :: ERROR ", error);
        console.log(error.code == "EEXIST" && error.syscall == "mkdir" && error.path.includes("backup"));
        if (error.code == "EEXIST" && error.syscall == "mkdir" && error.path.includes("backup")) {
            console.log("...READY TO LOAD DATA IN EXISTING MKDIR FOLDER");
        }

        
    }
}
const submit_modifyData = (req, res, next) => {
    console.log(".... PROCEEDING TO SUBMIT MODIFY DATA ");
}
const delete_createData = (req, res, next) => {
    console.log(".... PROCEEDING TO DELETE CREATE DATA ");
}









const JSON_push_data_into_backup_and_publish_folder = async (eachFolder, date, time) => {
    // getting details of who made the submission from UI
    const  data_backup = {
        name: "",
        rank: "",
        passcode: "",
        time: time,
        date: date
    };
    // wrtie JSON data file for the details of submission
    await fs_writeData(`${cc_jsonFolders.pending}/${eachFolder}/backup.json`, data_backup);
    // ....
    // copy paste data from pending folder dir to BACKUP FOLDER DIR and the PUBLISH FOLDER DIR 
        const fs_responds_file = await fs_readFileDir(`${cc_jsonFolders.pending}/${eachFolder}`);
        fs_responds_file.forEach(async file => {
            console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: PUSHING DATA JSON DIR TO BACKUP FOLDER ...."); 
            // data transfered to backup folder dir
            await fs_copyFileDir(`${cc_jsonFolders.pending}/${eachFolder}/${file}`, `${cc_jsonFolders.backup}/${eachFolder}/${date}-${time}/${file}`);
            // ...
            console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: PUSHING DATA JSON DIR TO BACKUP FOLDER STATUS....", 200); 
            console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: PUSHING DATA JSON DIR TO JSON PUBLISH FOLDER ...."); 
            // data transferred to the PUBLISH FOLDER DIR
            
            // ...
            // delete data json from the pending folder

            // ...
        });
    //...
};
const img_push_data_into_backup_and_publish_folder = async (eachFolder, date, time) => {
    // getting details of who made the submission from UI
    const  data_backup = {
        name: "",
        rank: "",
        passcode: "",
        time: time,
        date: date
    };
    // wrtie JSON data file for the details of submission
    await fs_writeData(`${cc_sharpStorage.pending}/${eachFolder}/backup.json`, data_backup);
    // ....
    // copy paste data from pending folder dir to BACKUP FOLDER DIR and the PUBLISH FOLDER DIR 
    const fs_responds_file = await fs_readFileDir(`${cc_sharpStorage.pending}/${eachFolder}`);
    fs_responds_file.forEach(async file => {
    
        console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: PUSHING DATA IMAGE DIR TO BACKUP FOLDER ...."); 
        // data transfered to backup folder dir
        await fs_copyFileDir(`${cc_sharpStorage.pending}/${eachFolder}/${file}`, `${cc_sharpStorage.backup}/${eachFolder}/${date}-${time}/${file}`);
        // ...
        console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: PUSHING DATA IMAGE DIR TO BACKUP FOLDER STATUS....", 200); 
        console.log("...CC_DATABASE :: ( SUBMIT CREATE DATA ) FUNCTION :: PUSHING DATA IMAGE DIR TO IMAGE PUBLISH FOLDER ...."); 
        // data transferred to the PUBLISH FOLDER DIR
        
        // ...
        // delete data image from the pending folder

        // ..
    });
//...

}
const deleteUploadFileFromDir = (arr) => {
    console.log("....CC_DATABASE HANDLER ::  CLEARING UPLOADED FILES FROM DIR INITIATE ....");

    arr.forEach(async (eachData) => {
        const dataObj = {name: eachData.originalname, location: eachData.destination};
        const dir = `${dataObj.location}/${dataObj.name}`;

        const resp = await fs_deleteFileFromDir(dir);
        console.log(".....CC_DATABASE HANDLER ::  CLEARING FILES STATUS ....", resp, 200);
    });
    return true;
};
const copyPasteData_sortingSubFolder = async (imageArr, sortParentFolderDir) => {
    let resp = "";
    console.log("...CC_DATABASE HANDLER (FUNCTION) :: INITIATING COPYING IMAGE FILES IN ''SORTING FOLDER''....");
    imageArr.forEach(async eachImage => {
        const data = `${eachImage.destination}/${eachImage.originalname}`;
        const des = `${sortParentFolderDir}/${eachImage.originalname}`;
        
        const isFileCopied = await fs_copyData(data, des);

        console.log("...CC_DATABASE HANDLER (FUNCTION) :: COPYING IMAGE FILES IN ''SORTING FOLDER'' STATUS....", isFileCopied, 200);
        resp = isFileCopied;
        return resp;
    });
};
const replace_seller_value = async (data) => {
    let resp = "";
    const entryDefaultOptions = JSON.parse(await fs_readFile("./json/cc_entryOptionsDefaults.json"));
        entryDefaultOptions.forEach(option => {
            if (option.id == data.seller) {
                resp = option.company;
                return resp;
            }
        });
        return resp;
}
const dataVariables_imgUrls = async (urls, imgUrlArray, sellerRef, imgName) => {
    urls.imgUrl = `${sellerRef}/main/${imgName}.webp`;// ()? urls = "" : imgUrlArray[]
    urls.imgSort1 = imgUrlArray[0];  urls.imgSort2 = imgUrlArray[1]; urls.imgSort3 = imgUrlArray[2];
    urls.imgSort4 = imgUrlArray[3];  urls.imgSort5 = imgUrlArray[5]; urls.imgSort6 = imgUrlArray[5];
    return urls;
}
const dataVariables_main = async (data_main, serverData, imgs, id) => {
    data_main.id = id;
    data_main.UID = serverData.data.uid;
    data_main.title = serverData.data.title;
    data_main.seller = serverData.seller;
    data_main.sellerRef = serverData.data.seller;
    data_main.price = serverData.data.price;
    data_main.priceDel = serverData.data.priceDel;
    data_main.priceFtr = serverData.data.priceFtr;
    data_main.starRated = serverData.data.starRated;
    data_main.categoryAll = serverData.data.categoryAll;
    data_main.subCategory = serverData.data.subCategory;
    data_main.imgUrl = imgs.imgUrl;

    return data_main;
};
const dataVariables_des = async (data_des, serverData, imgs, id) => {

    const tableResp = await reassigning_table_undefined_values(serverData);
    const urls = await reassigning_urls_undefined_values(imgs);

    data_des.id = id;
    data_des.UID = serverData.data.uid;
    data_des.title = serverData.data.title;
    data_des.seller = serverData.seller;
    data_des.sellerRef = serverData.data.seller;
    data_des.price = serverData.data.price;
    data_des.stockStatus = serverData.data.stockStatus;
    data_des.madeBy = serverData.data.madeBy;
    data_des.starRated = serverData.data.starRated;
    data_des.material = serverData.data.material;
    data_des.dimension = serverData.data.dimension;
    data_des.shipCost = serverData.data.shipCost;
    data_des.returnStatus = serverData.data.returnStatus;
    data_des.imgUrl = imgs.imgUrl;
    data_des.imgSort1 = urls.a;
    data_des.imgSort2 = urls.b;
    data_des.imgSort3 = urls.c;
    data_des.imgSort4 = urls.d;
    data_des.imgSort5 = urls.e;
    data_des.imgSort6 = urls.f;
    data_des.description = serverData.data.description;
    data_des.tb_para_1 = tableResp.a; 
    data_des.tb_para_2 = tableResp.b;
    data_des.tb_para_3 = tableResp.c;
    data_des.tb_para_4 = tableResp.d;
    data_des.tb_para_5 = tableResp.e;
    data_des.tb_para_6 = tableResp.f;
    data_des.tb_para_7 = tableResp.g;
    data_des.tb_para_8 = tableResp.h;
    data_des.tb_para_9 = tableResp.i;
    data_des.tb_para_10 = tableResp.j;
    data_des.tb_para_11 = tableResp.k;
    data_des.tb_para_12 = tableResp.l;
    data_des.tb_para_13 = tableResp.m;
    data_des.tb_para_14 = tableResp.n;
    data_des.tb_para_15 = tableResp.o;
    data_des.tb_det_1 = tableResp.A; 
    data_des.tb_det_2 = tableResp.B;
    data_des.tb_det_3 = tableResp.C;
    data_des.tb_det_4 = tableResp.D;
    data_des.tb_det_5 = tableResp.E;
    data_des.tb_det_6 = tableResp.F;
    data_des.tb_det_7 = tableResp.G;
    data_des.tb_det_8 = tableResp.H;
    data_des.tb_det_9 = tableResp.I;
    data_des.tb_det_10 = tableResp.J;
    data_des.tb_det_11 = tableResp.K;
    data_des.tb_det_12 = tableResp.L;
    data_des.tb_det_13 = tableResp.M;
    data_des.tb_det_14 = tableResp.N;
    data_des.tb_det_15 = tableResp.O;

    return data_des;
}
const reassigning_table_undefined_values = async (serverData) => {
    let a = "", b = "", c = "", d = "", e = "", f = "", g = "", h = "", i = "", j = "", k = "", l = "", m = "",  n = "", o = "";
    let A = "", B = "", C = "", D = "", E = "", F = "", G = "", H = "", I = "", J = "", K = "", L = "",  M = "",  N = "", O = "";
    const msg = undefined;
    if (serverData.data.tb_para_1 == msg) { serverData.data.tb_para_1 = ""; a = serverData.data.tb_para_1 }else { a = serverData.data.tb_para_1 };
    if (serverData.data.tb_para_2 == msg) { serverData.data.tb_para_2 = ""; b = serverData.data.tb_para_2 }else { b = serverData.data.tb_para_2 };
    if (serverData.data.tb_para_3 == msg) { serverData.data.tb_para_3 = ""; c = serverData.data.tb_para_3 }else { c = serverData.data.tb_para_3 };
    if (serverData.data.tb_para_4 == msg) { serverData.data.tb_para_4 = ""; d = serverData.data.tb_para_4 }else { d = serverData.data.tb_para_4 };
    if (serverData.data.tb_para_5 == msg) { serverData.data.tb_para_5 = ""; e = serverData.data.tb_para_5 }else { e = serverData.data.tb_para_5 };
    if (serverData.data.tb_para_6 == msg) { serverData.data.tb_para_6 = ""; f = serverData.data.tb_para_6 }else { f = serverData.data.tb_para_6 };
    if (serverData.data.tb_para_7 == msg) { serverData.data.tb_para_7 = ""; g = serverData.data.tb_para_7 }else { g= serverData.data.tb_para_7 };
    if (serverData.data.tb_para_8 == msg) { serverData.data.tb_para_8 = ""; h = serverData.data.tb_para_8 }else { h = serverData.data.tb_para_8 };
    if (serverData.data.tb_para_9 == msg) { serverData.data.tb_para_9 = ""; i = serverData.data.tb_para_9 }else { i = serverData.data.tb_para_9 };
    if (serverData.data.tb_para_10 == msg) { serverData.data.tb_para_10 = ""; j = serverData.data.tb_para_10 }else { j = serverData.data.tb_para_10 };
    if (serverData.data.tb_para_11 == msg) { serverData.data.tb_para_11 = ""; k = serverData.data.tb_para_11 }else { k = serverData.data.tb_para_11 };
    if (serverData.data.tb_para_12 == msg) { serverData.data.tb_para_12 = ""; l = serverData.data.tb_para_12 }else { l = serverData.data.tb_para_12 };
    if (serverData.data.tb_para_13 == msg) { serverData.data.tb_para_13 = ""; m = serverData.data.tb_para_13 }else { m = serverData.data.tb_para_13 };
    if (serverData.data.tb_para_14 == msg) { serverData.data.tb_para_14 = ""; n = serverData.data.tb_para_14 }else { n = serverData.data.tb_para_14 };
    if (serverData.data.tb_para_15 == msg) { serverData.data.tb_para_15 = ""; o = serverData.data.tb_para_15 }else { o = serverData.data.tb_para_15 };

    if (serverData.data.tb_det_1 == msg) { serverData.data.tb_det_1 = ""; A = serverData.data.tb_det_1 }else { A = serverData.data.tb_det_1 };
    if (serverData.data.tb_det_2 == msg) { serverData.data.tb_det_2 = ""; B = serverData.data.tb_det_2 }else { B = serverData.data.tb_det_2 };
    if (serverData.data.tb_det_3 == msg) { serverData.data.tb_det_3 = ""; C = serverData.data.tb_det_3 }else { C = serverData.data.tb_det_3 };
    if (serverData.data.tb_det_4 == msg) { serverData.data.tb_det_4 = ""; D = serverData.data.tb_det_4 }else { D = serverData.data.tb_det_4 };
    if (serverData.data.tb_det_5 == msg) { serverData.data.tb_det_5 = ""; E = serverData.data.tb_det_5 }else { E = serverData.data.tb_det_5 };
    if (serverData.data.tb_det_6 == msg) { serverData.data.tb_det_6 = ""; F = serverData.data.tb_det_6 }else { F = serverData.data.tb_det_6 };
    if (serverData.data.tb_det_7 == msg) { serverData.data.tb_det_7 = ""; G = serverData.data.tb_det_7 }else { G= serverData.data.tb_det_7 };
    if (serverData.data.tb_det_8 == msg) { serverData.data.tb_det_8 = ""; H = serverData.data.tb_det_8 }else { H = serverData.data.tb_det_8 };
    if (serverData.data.tb_det_9 == msg) { serverData.data.tb_det_9 = ""; I = serverData.data.tb_det_9 }else { I = serverData.data.tb_det_9 };
    if (serverData.data.tb_det_10 == msg) { serverData.data.tb_det_10 = ""; J = serverData.data.tb_det_10 }else { J = serverData.data.tb_det_10 };
    if (serverData.data.tb_det_11 == msg) { serverData.data.tb_det_11 = ""; K = serverData.data.tb_det_11 }else { K = serverData.data.tb_det_11 };
    if (serverData.data.tb_det_12 == msg) { serverData.data.tb_det_12 = ""; L = serverData.data.tb_det_12 }else { L = serverData.data.tb_det_12 };
    if (serverData.data.tb_det_13 == msg) { serverData.data.tb_det_13 = ""; M = serverData.data.tb_det_13 }else { M = serverData.data.tb_det_13 };
    if (serverData.data.tb_det_14 == msg) { serverData.data.tb_det_14 = ""; N = serverData.data.tb_det_14 }else { N = serverData.data.tb_det_14 };
    if (serverData.data.tb_det_15 == msg) { serverData.data.tb_det_15 = ""; O = serverData.data.tb_det_15 }else { O = serverData.data.tb_det_15 };
    return { a, b, c, d, e, f, g, h, i, j, k, l, m,  n,  o, A, B, C, D, E, F, G, H, I, J, K, L,  M,  N, O }
}
const reassigning_urls_undefined_values = async (imgs) => {
    let a = "", b = "", c = "", d = "", e = "", f = "";
    let defualt_imgUrl = `${cc_sharpStorage.default}`;

    if (imgs.imgSort1 == undefined) { imgs.imgSort1 = defualt_imgUrl; a = imgs.imgSort1 }else { a = imgs.imgSort1 };
    if (imgs.imgSort2 == undefined) { imgs.imgSort2 = defualt_imgUrl; b = imgs.imgSort2 }else { b = imgs.imgSort2 };
    if (imgs.imgSort3 == undefined) { imgs.imgSort3 = defualt_imgUrl; c = imgs.imgSort3 }else { c = imgs.imgSort3 };
    if (imgs.imgSort4 == undefined) { imgs.imgSort4 = defualt_imgUrl; d = imgs.imgSort4 }else { d = imgs.imgSort4 };
    if (imgs.imgSort5 == undefined) { imgs.imgSort5 = defualt_imgUrl; e = imgs.imgSort5 }else { e = imgs.imgSort5 };
    if (imgs.imgSort6 == undefined) { imgs.imgSort6 = defualt_imgUrl; f = imgs.imgSort6 }else { f = imgs.imgSort6 };

    return { a, b, c, d, e, f }
}




module.exports = { cc_sortUploadedImages, cc_sortData, submit_createData, submit_modifyData, delete_createData }