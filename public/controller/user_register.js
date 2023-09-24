const crypto = require("crypto");
const moment = require("moment");

// IMPORTATION OF FILE 
const month = require("../utils/func_date");
const { user_credentials } = require("./dataToDatabase")
// ...

let notification = "";
let alert_class = "server-respond";

// CREATE USER CREDENTIALS
const create_user_credentials = async (req, res) => {
    try {
        let { user_name, email, new_password, confirm_password } = req.body;
        // ...
        let data = {}
        // Destructuring array
            data.user = user_name;
            data.email = email;
            data.time = `${moment().format("HH:MM:SS")} ${month().h}`;
            data.date =  `${month().m} ${moment().format("DD,YYYY")}`;
        // ...
        //setting password value
        if (new_password === confirm_password) {
                const password = confirm_password;
                // Encrypting user password using crypto module
                    // generating general key
                    const salt = crypto.randomBytes(32)
                    // ...
                    // making password into hashed password
                    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', async (err, hashedPassword) => {
                        // wrapping hashed password in data object
                            data.password = hashedPassword.toString("hex"); data.salt = salt.toString("hex");

                            // push data into database
                                try {
                                    const dataRes = await user_credentials(req, res, data);
                                    console.log(dataRes);
                                    if (dataRes !== undefined) {
                                        console.log("user created");
                                        // notify user with an alert
                                        req.flash("create", `Successfully User Created As : ${data.user.toUpperCase()}`)
                                        // ....
                                    }
                                    else {
                                        req.flash("create", "Inputs Require !");
                                    }
                                } catch (error) {
                                    if (error.constraint == "users_email_key") {req.flash("create", "Email ID already exists !")}
                                    console.log("Create user error here", error);
                                }
                            // ...
                        // ...
                        notification = req.flash("create");
                        console.log("FLASH ALERT", notification);
                        res.render("register", { notification, alert_class });
                    });
                    // ....
                // ...
            }
        else {
            req.flash("create", "Password does NO MATCH !");
        }
    } catch (error) {
        console.log(error);
    }
}

const user_signIn = async(req, res, next) => {
    try { 
        // Set notification here
        if (req.session.passport.user) {
            req.flash("signIn", "User Successfully LogIn");
            console.log("USER DATA AFTER SIGN_IN:", req.user);
        }
        // Get notification here
        notification = req.flash("signIn");
        // ...
        console.log("flash-signIn", notification);
        res.render("register", { notification, alert_class });
    } catch (error) {
        res.render("./500")
        console.log("SignIn alert error", error);
    }
}


module.exports = { create_user_credentials, user_signIn }
