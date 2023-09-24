const store = require("store2");
const moment = require("moment");


// IMPORT UTILS FUNCTIONS
const function_checkout = require("../utils/func_checkout");
const month = require("../utils/func_date");
//...
// SERVER RESPONSES
var server_alert_class = "";
var notification = "";
var cost = 0;
var total = 0;
var costArr = [];
const data = {};
const order = {};
let img = "";
// ....
function checkout(req, res) {
    console.log("post request success");

    // destructuring data
    let { first_name, last_name, email, tel, company, region, 
        city, city_alt, digital, resident, agree, delivery, payment,
        order_number ,order_title, order_UID, order_price, order_amount, order_img } = req.body;
    // ...
    let cityRes = "";
        if (city == undefined || city == null || city == "Not Specified") {
                cityRes = city_alt; 
        }else if (city_alt == undefined || city_alt == null || city_alt == "Not Specified") {
            cityRes = city;
        }
    
        requestData(first_name, last_name, email, tel, company, region, 
            cityRes, digital, resident, agree, delivery, payment, order_number ,order_title, 
            order_UID, order_price, order_amount, order_img);

            console.log(data, order);

        // Storing data using store2 module
        store.local.set("client", JSON.stringify(data));
        store.local.set("order", JSON.stringify(order));
        // ...
        // making function as promise
        new Promise((resolve, reject) => {
            // push data to postgres  database
            const resp = function_checkout(data, order, req);
            // ...
            resolve(resp);
            reject("Error in Postgres database")
        }).catch(error => {
            res.render("./500")
        }).then(() => {
            // set class name and make it global using "res.locals.<local name>"
            server_alert_class = "server_alert";
            let warning_class = "auth_class";
            let user_alert = "";
            let parameters = "";
            // ...
            // request server notification and make it global using "res.locals.<local name>"
            notification =  req.flash("alert")
            //...
            res.render("./checkout", { server_alert_class, warning_class, user_alert, parameters, notification });
        })
}
function requestData(first_name, last_name, email, tel, company, region, 
    cityRes, digital, resident, agree, delivery, payment, order_number ,order_title, 
    order_UID, order_price, order_amount, order_img) {
    try {
        // client profile 
        data.firstName = first_name;
        data.lastName = last_name;
        data.email = email;
        data.tel = tel;
        data.company = company;
        data.region = region;
        data.city = cityRes;
        data.digital = digital;
        data.residential = resident;
        data.delivery = delivery;
        data.payment = payment;
        data.agree = agree;
        data.serial = order_number;
        // .....
        // client orders
        order.title = order_title;
        order.UID = order_UID;
        order.price = order_price;
        order.amount = order_amount;
        order.date =  `${month().m} ${moment().format("DD,YYYY")}`;
        order.time = `${moment().format("hh:mm:ss")} ${month().h}`;
        
        // .......
        
        if (order.price.length == 5) {
            img = order_img;
            order.imgUrl = img;

            cost = (Number(order.price) * Number(order.amount)).toFixed(2);
            total = cost
            // assigning total number to object
            order.cost = cost
            order.grand_total = total
            // ...
        }
        else if ((order.price.length + 5) !== 5) {
            img = order_img.map(el => {return el})
            order.imgUrl = img;

            if (costArr.length !== order.price.length) {
                // calculating cost 
                for (var i = 0; i < order.price.length; i++) {
                    cost = (order.price[i] * order.amount[i]).toFixed(2);  //multiplication section
                    // assigning to oject after pushing result in array
                    costArr.push(cost);
                }
                order.cost = costArr;
            }
            costArr.map(el => {
                total += Number(el);
            });
            order.grand_total = total.toFixed(2)
            // assigning total number to object
            //order.grand_total = total.toFixed(2);
            // ...

        }
    } catch (error) {
        console.log("request data error:", error);
    }

    
}
module.exports = checkout;