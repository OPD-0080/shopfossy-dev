const crypto = require("crypto");

// IMPORT FILES 
const pool = require("../router/pg-cred");
const { credentials, full_name_update, tel_update, password_update, delete_user_info, 
    google_full_name_update, google_tel_update, google_delete_user_info  } = require("../utils/query_database");
const { check_user_data_by_email } = require("../utils/query_database");
// .....

/****
 * REMINDER TO DO 
 *    as been done in tel section , do the same for the rest of the section 
 */

async function user_credentials(req, res, data) {
    try {
        // opening connection to database
        const client = await pool.connect();
        // ...
        // data check before inserting into database
        const single_data = await client.query( `SELECT * FROM ui.users WHERE user_name = '${data.user}';`);
        // ...
        client.release()
        // loading data into database
        if (single_data.rowCount == 0) {
            const queryRes = credentials(req, res, data)
            return queryRes

        }else if (single_data.rowCount > 0) {
            single_data.rows.map(el => {
                if (data.email == el.email) {
                    return single_data.rowCount
                }
            })
        }
        // ...
    } catch (error) {
        console.log("Error in Create Query data into database:", error);
        res.render("./500");
    }
}

async function update_profile_name(req, res, data) {
    try {
        if (req.session.passport.user.id.includes("-")) { // for locally 
            const resp = await full_name_update (req, res, data)
            return resp
        }else {// for google auth 2.0
            const resp = await google_full_name_update (req, res, data)
            return resp;
        }
    } catch (error) {
        console.log(error);
        res.render("500");
    }
}
async function update_profile_tel(req, res, data) {
    try {
        if (req.session.passport.user.id.includes("-")) { // for locally 
            const resp = await tel_update(req, res, data);
            return resp
        }else {// for google auth 2.0
            const resp = await google_tel_update(req, res, data);
            return resp;
        }
    } catch (error) {
        console.log(error);
        res.render("500");
    }
}
async function update_profile_password(req, res, data) {
    try {
        const password = data.password;
       // encrypting password
        const salt = await crypto.randomBytes(32);
        const hashed = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256");
        console.log(hashed);
        // ...
        // update password in database
        const hashedSalt = salt.toString("hex"); const hashedPassword = hashed.toString("hex");
        const resp = await password_update(hashedSalt, hashedPassword, req)
        // ...
        return resp
    } catch (error) {
        console.log(error);
        res.render("500");
    }
}
async function delete_user_account(curr_user_email, req, res) {
    try {
        const data = {
            email: curr_user_email,
            id: req.session.passport.user.id
        }
        if (req.session.passport.user.id.includes("-")) { // for locally
            const resp = await check_user_data_by_email(req, res);
            if (resp.info.rowCount == 1) {
                const isDeleted = delete_user_info(data);
                console.log("Account deletion done:");

                return isDeleted 
            }else {
                return false
            }
        }else {// for google auth 2.0
            const isDeleted = await google_delete_user_info(data);
            console.log("Account deletion done:");
            return isDeleted
        }
        
    } catch (error) {
        console.log("Error in delete_user_account handler:", error);
    }
}
// .....................
module.exports = { user_credentials, update_profile_name, update_profile_tel, update_profile_password, delete_user_account };