const store = require("store2");

// FILE IMPORTATION
const controlCenter = require("../controller/controlCenter");
const { isUSerAuthenticated } = require("../controller/passport");
const { displayPassportUser } = require("../utils/passport_user");
const { fs_fileExist, fs_createFile, Fs_WriteDataTo, fs_readFile, fs_readFileDir } = require("../utils/file_system");
const { tables, cc_jsonFolders } = require("../controller/settings");


const update_ui = require("../utils/cc/realTime_update");
// ...
let user_alert = "";
let warning_class = "auth_class";
let msg = "", user = "";

// pages
const index = async (req, res) => {
    try {
        // check user authentication status
        const auth_status = await new Promise((resolve, reject) => {
            resolve(isUSerAuthenticated(req));
            reject("error")
        });
        console.log(auth_status);

        // ....
        // display user info in DOM after authenticated
        if (auth_status == "authenticated") {
            const data = await displayPassportUser(req, res, msg, user);
            // display in DOM by making it global
            res.locals.userInfo = data;
            // ...
        } else if (auth_status == "not authenticated") {
            // display in DOM by making it global
            res.locals.userInfo = user;
            // ...
            req.flash("auth", "Please SignIn");
        }
        // ....
        
        user_alert = req.flash("auth");
        console.log(user_alert);
        res.render("index", { user_alert , warning_class})
    } catch (error) {
        console.log("Server Error in Index:", error);
        res.render("500");
    }
}
const register = async (req, res) => {
    try {
        // check for user authentication locally
        // check user authentication status
        const auth_status = await new Promise((resolve, reject) => {
            resolve(isUSerAuthenticated(req));
            reject("error")
        });
        console.log(auth_status);
        // ....
        if (auth_status == "authenticated") {
             // redirect page to home page
            res.redirect("index")
        }
        res.render("register")
        // ...
        
    } catch (error) {
        console.log("Error from REGISTER GET ROUTER", error);
        res.render("500")
    }
}
const edit_profile = async (req, res) => {
    try {
        let data = "";
         // check user authentication status
        const auth_status = await new Promise((resolve, reject) => {
            resolve(isUSerAuthenticated(req));
            reject("error")
        });
        console.log(auth_status);

        if (auth_status == "authenticated") {
            data = await displayPassportUser(req, res, msg, user);
            // display in DOM by making it global
                res.locals.userProfile = data;
                
            // ...
        }
        else if (auth_status == "not authenticated") {
            // display in DOM by making it global
            res.locals.userProfile = data;
            // ...
        }

        res.render("edit_profile")
    } catch (error) {
        res.render("500");
    }
}
const signOut = (req, res, next) => {
    try {
        res.clearCookie("connect.sid", {path: "/"}) // destroying cookie to make user log out
        console.log("user logout");

        // redirecting route to "index", after signOut done
        res.redirect("index")
    } catch (error) {
        res.render("500")
    }
}
const companyA = async (req, res) => {
    try {
        // check user authentication status
        const auth_status = await new Promise((resolve, reject) => {
            resolve(isUSerAuthenticated(req));
            reject("error")
        });
        console.log(auth_status);
        // ....

        // display user info in DOM after authenticated
        if (auth_status == "authenticated") {
            const data = await displayPassportUser(req, res, msg, user);
            // display in DOM by making it global
            res.locals.userInfo = data;
            // ...
        } else if (auth_status == "not authenticated") {
            // display in DOM by making it global
            res.locals.userInfo = user;
            // ...
            req.flash("auth", "Please SignIn");
        }
        // ....

        user_alert = req.flash("auth");
        console.log(user_alert);
        res.render("company-name-1", { user_alert , warning_class});
    } catch (error) {
        console.log("Server Error in Company page:", error);
        res.render("500");
    }
}
const companyB = async(req, res) => {
    try {
        // check user authentication status
        const auth_status = await new Promise((resolve, reject) => {
            resolve(isUSerAuthenticated(req));
            reject("error")
        });
        console.log(auth_status);
        // ....
        // display user info in DOM after authenticated
        if (auth_status == "authenticated") {
            const data = await displayPassportUser(req, res, msg, user);
            // display in DOM by making it global
            res.locals.userInfo = data;
            // ...
        } else if (auth_status == "not authenticated") {
            // display in DOM by making it global
            res.locals.userInfo = user;
            // ...
            req.flash("auth", "Please SignIn");
        }
        // ....

        user_alert = req.flash("auth");
        console.log(user_alert);
        res.render("company-name-2", { user_alert , warning_class});
    } catch (error) {
        console.log("Server Error in Company page:", error);
        res.render("500");
    }
}
const checkout = async (req, res) => {
    try {
        let parameters = {};
        // check user authentication status
        const auth_status = await new Promise((resolve, reject) => {
            resolve(isUSerAuthenticated(req));
            reject("error")
        });
        console.log(auth_status);
        // ....
        if (auth_status == "authenticated") {
            req.flash("auth", "User authenticated");
            // get the current user email
            const curr_email = req.session.passport.user.email;
            parameters = {curr_email}
            // ....
        }else {
            // prevent user from checking out
            req.flash("auth", "User not authenticated")
            // .....
        }

        
        user_alert = req.flash("auth");
        console.log(user_alert);
        res.render("checkout", { user_alert , warning_class, parameters});
    } catch (error) {
        console.log("Server Error in Checkout page:", error);
        res.render("500");
    }
}
const thankyou = (req, res) => {
    // getting data from store2
    let clients = JSON.parse(store.local.get("client"));
    let orders = JSON.parse(store.local.get("order"));
    // ....
    //console.log(clients, orders);
    // wrapping all in object and store them in session storage
    req.session.data = {clients, orders};
    // ...
    let DOMClass = "errorClass";
    res.locals.DOMClass = DOMClass;
    let data = {};
    try {
        if (req.session.data !== null || req.session.data !== undefined) {
            res.locals.data = req.session.data
            res.render("thankyou")
        }else { 
            // if client refreshes the page 
            data = "";
            res.locals.data = data;
            res.render("thankyou")
        }
        // ...
    } catch (error) {
        console.log("invoice error: ", error);
    }
}
const error_internal = (req, res) => {

    res.render("500");
}
const error_pageNotFound = (req, res) => {

    res.render("404");
}
const admin_register = (req, res) => {

    res.render("admin");
}
const control_center = (req, res) => {
    controlCenter(req, res)
}
const createData = async (req, res) => {
    let previewData = [];

    try {
        let JSONParentRes = await fs_readFileDir(`${cc_jsonFolders.pending}`);
        if (JSONParentRes.length == 0) {
            res.locals.preview = previewData;

            console.log(res.locals);

            res.render("db_createData");
        }else {
            // Get data from pending folder dir 
            const JSON_pending_parent_folders = await fs_readFileDir(`${cc_jsonFolders.pending}`);
            const entryDefaultOptions = JSON.parse(await fs_readFile(`${cc_jsonFolders.default}`));
            console.log("....JSON PARENT FOLDERS....", JSON_pending_parent_folders, entryDefaultOptions);


            for (let i = 0; i < JSON_pending_parent_folders.length; i++) {
                const eachFolder = JSON_pending_parent_folders[i];

                const JSON_data_main = JSON.parse(await fs_readFile(`${cc_jsonFolders.pending}/${eachFolder}/mainData.json`));
                const JSON_data_des = JSON.parse(await fs_readFile(`${cc_jsonFolders.pending}/${eachFolder}/description.json`));

                // switching coded company name with it real name
                const defaultOptionResp = entryDefaultOptions.find(option => { return option.id == eachFolder });
                // ...
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
            }
            // Make variables global 
            res.locals.preview = previewData;
            // ...
            
            res.render("db_createData");
        }
        
    } catch (error) {
        console.log("ERROR IN DATABASE ROUTER.....",error);
    }
}




module.exports = { index, register, edit_profile, signOut, companyA, companyB, checkout, thankyou, error_internal, 
    error_pageNotFound, admin_register, control_center, createData }