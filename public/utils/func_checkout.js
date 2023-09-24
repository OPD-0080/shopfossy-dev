const moment = require("moment");

// PG CREDENTIALS
const pool = require("../router/pg-cred");
// ...
// IMPORTING FILES FROM UTILS
// ..

const func_checkout = async(data, order, req) => {
    // alert user
    console.log("Connecting to DATABASE ..."); 
    // ...
    const client = await pool.connect(); // connect client to POSTGRES
    // alert user 
    console.log("Database Connection DONE !");
    // ...
    try {
        // alert user
        console.log("Initiating DATA SUBMISSION ...");
        // ...
        await client.query(
            `   INSERT INTO ui.checkout 
                (
                    checkout_code, first_name, last_name, email, tel, company, region, city, residential,
                    digital, delivery, payment, date_created, time_created
                )
                VALUES (
                    '${data.serial}', '${data.firstName}', '${data.lastName}', '${data.email}', 
                    '${data.tel}', '${data.company}', '${data.region}', 
                    '${data.city}', '${data.residential}', '${data.digital}', 
                    '${data.delivery}', '${data.payment}', '${order.date}', '${order.time}'
                );
            `
        )
        await client.query(
            `
                INSERT INTO ui.ordered_items
                (
                    product_code, checkout_code, title, price, quantity, total, date_created, time_created, img_url
                )
                VALUES (
                    '${order.UID}', '${data.serial}', '${order.title}', '${order.price}', '${order.amount}',
                    '${order.grand_total}', '${order.date}', '${order.time}', '${order.imgUrl}'
                );
            `
        )
        // alerting user 
        console.log("Data Submission COMPLETED !");
        // ...
        // releasing client to postgres pool connection
        client.release()
        // ....
        // SET SERVER RESPONSES NOTIFICATION VIA flash module
        req.flash("alert", "Successfully made an ORDER !")
        // ...
    } catch (err) {
        console.log("Error in database:", err);
        if (err.constraint.length == 26 ) {
            req.flash("alert", "Order has already been submitted !")
        }
    }
}
module.exports = func_checkout;