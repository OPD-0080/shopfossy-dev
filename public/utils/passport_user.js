// IMPORT FILES 
const { check_user_data_by_email } = require("../utils/query_database");
const crypto = require("crypto");
const fs = require("fs").promises;
const pool = require("../router/pg-cred");
// ....

// IMPORTATION OF FILES
const { tables } = require("../controller/settings");
const { select_single_data_from_table_by_ID } = require("../utils/query_database");
const { sharpStorage } = require("../controller/settings");
// ...


const displayPassportUser = async (req, res, msg, user) => {
    // getting data from database
    const data = await check_user_data_by_email(req, res); 
    console.log(".....FROM PASSPORT DISPLAY ROUTER (IN PASSPORT_USER JS FILE).....",req.session.passport.user);


    if (data.info.rows.length == 0) { // if SIGNED IN BY GOOGLE AUTH 2.0
        const client = await pool.connect(); // connect to database
        const data = await client.query(`SELECT * FROM ${tables.google} WHERE id = '${req.session.passport.user.id}';`);
        client.release();
        //const data = await select_single_data_from_table_by_ID(googleData.id, tables.google);
        console.log("....DATA FROM GOOGLE ROUTER DISPLAY (IN PASSPORT_USER JS FILE).....", data.rows);
        user = {
            username: data.rows[0].surname,
            full_name: `${data.rows[0].other_names} ${data.rows[0].surname}`,
            email: data.rows[0].email,
            tel: data.rows[0].tel, 
            pic: data.rows[0].pic,
        };
        // ...
        return user;
        // ...
    }else { // OR BY LOCALLY
        const imagePath = {
            compress: `./uploaded_images/compress/${data.images.rows[0].name}`
        }
        user = {
            username: data.info.rows[0].user_name,
            full_name: data.info.rows[0].full_name,
            email: data.info.rows[0].email,
            tel: data.info.rows[0].tel, 
            pic: imagePath.compress
        };
        // ...
        return user;
    }
    
    
};

// ...............


module.exports = { displayPassportUser }