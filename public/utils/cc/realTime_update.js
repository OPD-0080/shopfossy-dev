const moment = require("moment");
console.log(moment().format("hh:mm"));

// IMPORTING DATABASE CREDENTIALS
const pool = require("../../router/pg-cred");
// ...
// FILES IMPORTATION
const { check_data, push_data } = require("./data_checker");
const { select_data_all_from_table } = require("../query_database")
const { tables } = require("../../controller/settings");

// ...

let category = [];
let timeArray = [];
let storage = [];
let ordered_storage = [];
let users_storage = [];
let userImages_storage = [];
let currentTime = moment().format("hh:mm");
let data = {};
let container = {};
let colors = {};

const update_ui = async (req) => {
    try {
        // get data from database
        const checkoutRes = await select_data_all_from_table(tables.checkout);
        const orderedRes = await select_data_all_from_table(tables.ordered_items);
        const usersRes = await select_data_all_from_table(tables.users);
        const userImagesRes = await select_data_all_from_table(tables.images)

        const checkout_data = checkoutRes.rows;
        const ordered_items_data = orderedRes.rows;
        const userLogs = usersRes.rows;
        const userImages = userImagesRes.rows;
        // ....
        // wrapping in object
        const database = { checkout_data, ordered_items_data, userLogs, userImages }
        // ....
        // checking for any duplication of data in array storage with data from database
        // and update array storage if no duplication occurs
        const is_checkout_data_duplicated = await check_data(storage, database.checkout_data);
        const is_ordered_data_duplicated = await check_data(ordered_storage, database.ordered_items_data);
        const is_user_data_duplicated = await check_data(users_storage, database.userLogs);
        const is_user_images_duplicated = await check_data(userImages_storage, database.userImages);
        // ....
        // Notification color index to change color when update happens
        const checkout_index = is_checkout_data_duplicated;
        const order_index = is_ordered_data_duplicated;
        // ...
        // if result is -1, then push data to array storage
        if (is_checkout_data_duplicated || is_ordered_data_duplicated || is_user_data_duplicated || is_user_images_duplicated) {
            // getting ONLY data starting from database starting from  the PREVIOUS data / index
            push_data(is_checkout_data_duplicated, database.checkout_data, storage); // for checkout 
            push_data(is_ordered_data_duplicated, database.ordered_items_data, ordered_storage); // for ordered_items;
            push_data(is_user_data_duplicated, database.userLogs, users_storage); // for login in users;
            push_data(is_user_images_duplicated, database.userImages, userImages_storage); // for user images;

            //console.log("updated storage:", storage);
            //console.log("updated ordered items storage:", ordered_storage);
           // console.log("updated users storage:", users_storage);
            
            // ...
            // destructuring array without modifying original array
                storage.map(el => {
                    var {first_name} = el.first_name;
                    var {last_name} = el.last_name;
                    var {email }= el.email;
                    var {tel} = el.tel;
                    var {company} = el.company;
                    var {region} = el.region;
                    var {city} = el.city;
                    var {residential} = el.residential;
                    var {digital} = el.digital;
                    var {delivery} = el.delivery;
                    var {payment} = el.payment;
                    var {date} = el.date_created;
                    var {time} = el.time_created;

                    (el.first_name !== undefined)? category.push("Order") : "";

                    return (first_name, last_name, email, tel, company, region, city, residential, digital, delivery, payment, date, time)
                });
            // ...
            // wrapping storage array in container same as for colors
            container = {storage, ordered_storage, users_storage, userImages_storage};
            colors = {checkout_index, order_index};
            // ....
            

            data = {container, colors, category} // returning data to the get-router
            return data

        }else if (is_checkout_data_duplicated == false) {
            console.log("NO updated found");

            // set an array and push a random text
            // if client refreshes page more than once , data is push into array
            // get the length of array
            // if if length exceeds 2 , notify client 
            // if length is less than 2, notify client 

            return data
        }
    } catch (error) {
        console.log("Error in client query:", error);
    }
}


module.exports = update_ui;