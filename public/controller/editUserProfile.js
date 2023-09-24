const pool = require("../router/pg-cred");


// IMPORT FILES
const { tables } = require("../controller/settings");
const { sharpStorage } = require("./settings");
const { update_profile_name, update_profile_tel, update_profile_password, delete_user_account } = require("./dataToDatabase")
const { check_user_data_by_email, select_single_data_from_table_by_ID } = require("../utils/query_database");
const { crypto_encryptData, crypto_decryptData } = require("../utils/crypto");
const { resizeImage, compress_image } = require("../utils/sharp");
const { photo_update } = require("../utils/query_database");
const { fs_delete_file_from_storage } = require("../utils/file_system");
// ....

const uploadPhoto = async (req, res, next) => {
    try {
        const uploaded_data = req.file;
        console.log("upload photo using multer::::", uploaded_data);
        
        // Get the path url of the uploaded image from multer storage and other parameters needed
        const imagePath =  req.file.path;
        const fileName = req.file.filename;
        const destination = req.file.destination;
        const userEmail = req.session.passport.user.email;
        const emailId = userEmail.trim().split("@")[0];
        const mimeType = req.file.mimetype;
        const ext = mimeType.trim().split("/")[1];
        // ....

        // resize image with sharp module
        const sharpResize = {
            path: imagePath,
            emailId: emailId,
            fileExt: ext
        }
        const sharp_res = await resizeImage(sharpResize);
        // ...
        // compress resized image with sharp module
        if (sharp_res.width == 200) {
            const sharp_compress = await compress_image(req, sharpResize);
            console.log("compress data:", sharp_compress);

            if (sharp_compress == "compress failed") {
                console.log("Error in compressing image data");
            }else {
                // wrap up parameter needed
                    const imageData = {
                        format: sharp_compress.format,
                        name: `user_${sharpResize.emailId}.webp`,
                        size: sharp_compress.size
                    }
                // ...
                // Store image info in database
                    const resp = await photo_update(req, imageData);
                    if (resp.rowCount == 1) {
                        console.log("photo update done");

                        // delete files in multer and resize storage folder
                        const mf_name = `/${fileName}`;
                        const multer_file_deleted = await fs_delete_file_from_storage(destination, mf_name)
                        if ( multer_file_deleted == undefined) {
                            console.log("Files  in multer deleted:");
                        }else {
                            console.log("failed to delete file from MULTER STORAGE folder");
                        }
                        // ...
                        // delete file from sharp storage folder
                        const rs_name = `/user_${sharpResize.emailId}.${sharpResize.fileExt}`;
                        const sharp_file_deleted = await fs_delete_file_from_storage(sharpStorage.resized, rs_name)
                        if (sharp_file_deleted == undefined) {
                            console.log("Files  in sharp deleted:");
                        }else {
                            console.log("failed to delete file from SHARP STORAGE folder");
                        }
                        // ....
                    }else {
                        console.log("unable to update photo in database");
                    }
                // ...
            }
        }else {
            console.log("Failed to compress uploaded image");
        }
        
        //console.log(req.flash("profile")[0]);
        res.redirect("edit_profile")
    } catch (error) {
        console.log(error);
        res.render("500");
    }
    
}
const edit_user_profile = async (req, res, next) => {
    try {
        let google = {};
        const name = req.body.full_name; const tel = req.body.tel; const auth_password = req.body.auth_password;
        const email = req.body.email; const url = req.body.avatar; const password = req.body.user_password;

        const data = {name: name, email: email, tel: tel, img: url, auth_password: auth_password, password: password};

        console.log("data from DOM:",req.body, req.session.passport.user);
        //console.log(data.img);

        // CHECKING IF USER SIGN WITH GOOGLE AUTH 2.0 OR LOCALLY
        if (req.session.passport.user.id.includes("-")) {// is done locally
            const single_user_profile = await check_user_data_by_email(req, res);

            // updating user profile in database 
            proceedToEditProfile(req, res, single_user_profile.info.rows[0], data);
            // ....
        }else {// is done via google auth 2.0
            const currentData = await select_single_data_from_table_by_ID(req.session.passport.user ,tables.google);
            console.log("...CURRENT DATA ...,", currentData.rows[0]);

            // destructuring data
            google.id = currentData.rows[0].id;
            google.username = currentData.rows[0].surname;
            google.full_name = `${currentData.rows[0].other_names} ${currentData.rows[0].surname}`;
            google.email = currentData.rows[0].email;
            google.tel = currentData.rows[0].tel;
            // ...
            // updating user profile in database 
            proceedToEditProfile(req, res, google, data);
            // ...
        }
        // ....

        console.log(req.flash("profile")[0]);
        res.redirect("edit_profile")
        // .....
    } catch (error) {
        res.render("500");
    }
}
const delete_account = async (req, res, next) => {
    try {
        if (req.session.passport.user.id.includes("-")) {// FOR LOCALLY
            const google_id = req.session.passport.user.id;
            proceedToDeleteAccount(req, res, google_id)
            // ...
        }else {// FOR GOOGLE AUTH 2.0
            const local_id = req.session.passport.user.id;
            proceedToDeleteAccount(req, res, local_id)
        }

        
    } catch (error) {
        console.log("Error in Delete account router:", error);
        res.render("500");
    }
}
function flashAlert(req, resp) {
    if (resp.rowCount == 0) {
        // alert user a notification
            req.flash("profile", "Update NOT Successful ...!")
        // ...
    } else {
        // alert user a notification
        req.flash("profile", "Successfully Updated !")
        // ...
    }
}
const proceedToEditProfile = async (req, res, dbData, data) => {
     // FOR FULL NAME
    if ((data.name !== "") && (dbData.full_name !== data.name)) {
        console.log("update full name", data.name);
            if (dbData.full_name == data.name) {
            // STOP update and
            // alert user a notification
            console.log(`${data.name} already exist ...!`);
            req.flash("profile", `${data.name} already exist ...!`)
            // ...
        }else {
            // update profile
            const resp = await update_profile_name(req, res, data);
            console.log("update profile name:", resp);
            flashAlert(req, resp)
        }
    }// FOR TEL
    else if ((data.tel !== "") && (dbData.tel !== data.tel)) {
        console.log("update tel here", data.tel);
        if (dbData.tel == data.tel) {
            // STOP update and
            // alert user a notification
            console.log(`${data.tel} already exist ...!`);
            req.flash("profile", `${data.tel} already exist ...!`)
            // ...
        }else {
            // update profile
            const resp = await update_profile_tel(req, res, data);
            // console.log("update profile tel:", resp);
            flashAlert(req, resp)
        }
    }// FOR PASSWORD
    else if ((data.password !== "")) {
        console.log("update password");

        // get the old hashed password from database
        let password = "";
        password = dbData.password;
        // ...
        // update password with crypto
        const resp = await update_profile_password(req, res, data)
        flashAlert(req, resp)
    }
}
const proceedToDeleteAccount = async (req, res, userID) => {
    const curr_user_email = req.session.passport.user.email;
    const deletion_status = await delete_user_account(curr_user_email, req, res);
    
    if ("info" in deletion_status) {// FOR LOCALLY 
        if (deletion_status.info.rowCount == 1) {
            console.log(`${curr_user_email} account deletion successfully`);
            // sign out
            res.redirect("signOut");
            // ... 
        }else {
            console.log("Account deletion error");
            res.render("500");
        }
    }else {// FOR GOOGLE AUTH 2.0
        if (deletion_status.rowCount == 1) {
            console.log(`${curr_user_email} account deletion successfully`);
            // sign out
            res.redirect("signOut");
            // ... 
        }else {
            console.log("Account deletion error");
            res.render("500");
        }
    }

    
}
module.exports = { edit_user_profile, uploadPhoto, delete_account };