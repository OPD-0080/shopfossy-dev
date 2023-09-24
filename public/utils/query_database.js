const pool = require("../router/pg-cred");
const { tables } = require("../controller/settings");
const moment = require("moment");
const month = require("../utils/func_date");


const credentials = async (req, res, data) => {
    // get user credentials from database
    const client = await pool.connect();
    const queryRes = client.query(
        `INSERT INTO ${tables.users} (user_name, email, password, date_created, time_created, salt)
            VALUES ('${data.user}', '${data.email}', '${data.password}', '${data.date}', '${data.time}', '${data.salt}');
        `
    );
    // updating user_images table with email
    client.query(
        `INSERT INTO ${tables.images} (email, name, format, size) VALUES ('${data.email}', 'null', 'null', 'null');`
    );

    client.release();
    return queryRes
}

const check_user_data_by_email = async (req, res) => {
    // get user credentials from database
    const client = await pool.connect();
    const a = await client.query(`SELECT * FROM ${tables.users} WHERE email = '${req.session.passport.user.email}';`);
    const b = await client.query(`SELECT * FROM ${tables.images} WHERE email = '${req.session.passport.user.email}';`);
    client.release() // releasing client back to the pool connection
    const data = {info: a, images: b}
    return data
}

// UPDATING USER PROFILE LOCALLY (PASSPORT)
const full_name_update = async (req, res, data) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query( `UPDATE ${tables.users} SET full_name = '${data.name}' WHERE email = '${req.session.passport.user.email}';`);
    client.release();

    return resp
}
const tel_update = async (req, res, data) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query( `UPDATE ${tables.users} SET tel = '${data.tel}' WHERE email = '${req.session.passport.user.email}';`);
    client.release();

    return resp
}
const photo_update = async (req, imageData) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query( 
        `   UPDATE ${tables.images} SET 
                name = '${imageData.name}', format = '${imageData.format}', size = '${imageData.size}'
            WHERE email = '${req.session.passport.user.email}';
        `
    );
    client.release();

    return resp
}
const password_update = async (hashedSalt, hashedPassword, req) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query( `UPDATE ${tables.users} SET password = '${hashedPassword}', salt = '${hashedSalt}' WHERE email = '${req.session.passport.user.email}';`);
    client.release();

    return resp
}
const delete_user_info = async (data) => {
    const client = await pool.connect(); // connect to database
    
    const a = await client.query(`DELETE FROM ${tables.users} WHERE email = '${data.email}';`);
    const b = await client.query(`DELETE FROM ${tables.images} WHERE email = '${data.email}';`);
    client.release();

    const info = {info: a, images: b}
    return info
}
//...............
// UPDATING PROFILE GOOGLE AUTH 2.0 (PASSPORT)
const google_full_name_update = async (req, res, data) => {
    const client = await pool.connect(); // connect to database
    if (req.session.passport.user.id.includes("-")) { //FOR LOCALLY
        const resp = client.query( `UPDATE ${tables.users} SET full_name = '${data.name}' WHERE email = '${req.session.passport.user.email}';`);
        return resp
    }else {// FOR GOOGLE AUTH 2.0
        const resp = client.query( `UPDATE ${tables.google} SET other_names = '${data.name}' WHERE email = '${req.session.passport.user.email}';`);
        if (resp) {
            const resp = client.query( `UPDATE ${tables.google} SET surname = '${""}' WHERE email = '${req.session.passport.user.email}';`);
            return resp
        }
        
    }

    
    client.release();


}
const google_tel_update = async (req, res, data) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query( `UPDATE ${tables.google} SET tel = '${data.tel}' WHERE email = '${req.session.passport.user.email}';`);
    client.release();

    return resp
}
const google_delete_user_info = async (data) => {
    const client = await pool.connect(); // connect to database
    const reps = await client.query(`DELETE FROM ${tables.google} WHERE id = '${data.id}';`);
    client.release();

    return reps
}
const select_single_data_from_table_by_ID = async (data, tableName) => {
    const client = await pool.connect(); // connect to database
    const resp = await client.query(`SELECT * FROM ${tableName} WHERE id = '${data.id}';`);
    client.release();
    return resp;
}
const insert_single_data_into_table = async (data, tableName) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query(
        `INSERT INTO ${tableName} (id, surname, other_names, email, email_verified, tel, pic, date_created, time_created)
        VALUES ('${data.id}', '${data.surname}', '${data.other_names}', '${data.email}', '${data.emailVerified}', '${data.tel}', '${data.picUrl}', '${month().m} ${moment().format("DD,YYYY")}', '${moment().format("hh:mm")} ${month().h}');

        `);
    client.release();
    return resp;
}
// ..............
// CONTROL CENTER 
const select_data_all_from_table = async (tableName) => {
    const client = await pool.connect(); // connect to database
    const resp = client.query(`SELECT * FROM ${tableName};`);
    client.release();
    return resp;
}

// ....

module.exports = { credentials, check_user_data_by_email, full_name_update, tel_update, photo_update, password_update, delete_user_info, 
    select_data_all_from_table, select_single_data_from_table_by_ID, insert_single_data_into_table,
    google_full_name_update, google_tel_update, google_delete_user_info
}