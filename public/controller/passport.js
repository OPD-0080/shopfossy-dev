const LocalStrategy = require('passport-local');
const passport = require("passport");
const crypto = require("crypto");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// IMPORTATION OF LOCAL FILES 
const { tables } = require("./settings");
const { select_single_data_from_table_by_ID, insert_single_data_into_table } = require("../utils/query_database");
// .......

const pool = require("../router/pg-cred");

// VERIFYING USER CREDENTIALS FOR USER SIGN-IN
const verify = async(username, password, cb) => {
    // opening connection to database
        const client = await pool.connect();
    // ...
    // Query required data from database
        client.query(`SELECT * FROM ${tables.users} WHERE user_name = '${username}';`, (err, user) => {
            if (err) { return cb(err); }
            if (user.rowCount == 0) { 
                return cb(null, false, { message: 'UserName Not Found !' }); 
            }
            // verifying hashed password
            crypto.pbkdf2(password, Buffer.alloc(32, user.rows[0].salt, 'hex'), 310000, 32, 'sha256', function(err, hashedPassword) {
                if (err) { return cb(err); }

                if (!crypto.timingSafeEqual(Buffer.alloc(32, user.rows[0].password, 'hex'), hashedPassword)) {
                    console.log("User Password incorrect");
                    return cb(null, false, { message: 'User Password incorrect.' });
                }
                return cb(null, user.rows[0]);
            });
            // ...
        })
        client.release(); // release client back to the pool connection
    // ...
}
const passport_strategy = new LocalStrategy( verify );
// .....................................................................

// PASSPORT GOGGLE AUTHENTICATION 2
const google_auth20_strategy = new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "http://localhost:3002/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        const account = profile._json;
        console.log("GOOGLE AUTHENTICATION 2.0 PROFILE (IN PASSPORT JS FILE)..........", account);
        const googleData = {}
        // destructuring data
        googleData.id = account.sub;
        googleData.surname = account.family_name;
        googleData.other_names = account.given_name;
        googleData.picUrl = account.picture;
        googleData.email = account.email;
        googleData.tel = "";
        googleData.emailVerified = account.email_verified;
        // ....

        try {
            // check database if profile is already present
            const client = await pool.connect(); // connect to database
            const resp = await client.query(`SELECT * FROM ${tables.google} WHERE id = '${googleData.id}';`);
            client.release();

            console.log("SINGLE DATA RESULTS FROM DATABASE (IN PASSPORT JS FILE) .....", resp.rows.length);
                if (resp.rows.length == 0) {
                    // create user profile and get data from database
                    const isDataInserted = await insert_single_data_into_table(googleData, tables.google);
                    if (isDataInserted.rowCount == 1) {
                        console.log("....DATA INSERTION TO DATABASE (IN PASSPORT JS FILE).......", 200);

                        done(null, googleData)
                    }else {
                        console.log("....DATA INSERTION TO DATABASE (IN PASSPORT JS FILE).......", 404);
                    }
                }else {
                    // get current user data
                    const currentData = resp.rows[0];
                    done(null, currentData)
                }
        } catch (err) {
            console.log(err);
            if (err.detail.includes("already exists")) {
                console.log("....FILE ALREADY EXISTS IN DATABASE (IN PASSPORT JS FILE)....");

                done(err, null)
            }
        }
    }
)
// .................

// SETTING USER INFO IN SESSION TO BE USED LATER
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
        console.log("SERIALIZE USER IN PASSPORT ROUTER (IN PASSPORT JS FILE)......", user, user.hasOwnProperty("surname"));

        if (user.hasOwnProperty("surname")) { // for google auth 2.0 
            return cb(null, {
                id: user.id,
                username: user.surname,
                full_name: `${user.other_names} ${user.surname}`,
                email: user.email,
                picture: user.picUrl,
                tel: user.tel
            });
        }else { // for locally
            return cb(null, {
                id: user.id,
                username: user.user_name,
                full_name: user.full_name,
                email: user.email,
                picture: user.img,
                tel: user.tel
            });
        }
        
    });
});
passport.deserializeUser(function(user, cb) {
    process.nextTick(async function() {
        console.log("DESERIALIZE USER IN PASSPORT ROUTER (IN PASSPORT JS FILE)......", user);

        const client = await pool.connect();  // opening connection to database
        if (user.id.includes("-")) { // if true, then signed_in was done locally
            // Query required data from database
            const res = await client.query(`SELECT * FROM ${tables.users} WHERE id = '${user.id}';`)
                client.release();
                user = res.rows[0];

            return cb(null, user);

        }else {// if false, then signed_in was done by google auth 2.0
            const resp = await client.query(`SELECT * FROM ${tables.google} WHERE id = '${user.id}';`);
            client.release();
            user = resp.rows[0];

            return cb(null, user)
        }
    });
});
// ............................................
// CHECK FOR AUTHENTICATION OF USER BEFORE ACCESSING RESOURCES
const isUSerAuthenticated = (req) => {
    if (req.session.passport) {
        return "authenticated"
    }else {
        // alert user with notification
        return "not authenticated"
    }
}
// ......




module.exports = { passport_strategy, google_auth20_strategy, isUSerAuthenticated }