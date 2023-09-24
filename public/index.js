// IMPORTATION
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const pgSession = require("express-pg-session")(session);
// ...
// EXPRESS ROUTERS
const route_pages = require("./router/route-pages");
const route_post = require("./router/route-post");
const  pool = require("./router/pg-cred");
const { passport_strategy, google_auth20_strategy } = require("./controller/passport");
require("dotenv").config();
// ...
// INITIALIZATION
const app = express(); // all app depends on 
const PORT = process.env.PORT || 3002;
// ...

// MIDDLEWARE
app.set("views", "./views/pages") // setting new view path 
app.set("view engine", "ejs");
//app.use(morgan("dev")); // to detect server request
app.use(bodyParser.json({limit: "3mb"}));  // data will be use  in JSON Format
app.use(bodyParser.urlencoded({extended: true, limit: "3mb"})) // to post request and able to get data from it url

// middleware for pop up messaging in server
const columnNames = {
    session_id: `${process.env.PG_SESSION_ID}`,
    session_data: `${process.env.PG_SESSION_DATA}`,
    expire: `${process.env.PG_SESSION_EXPIRE}`
};
const session_pg_store = new pgSession({
    pool: pool,
    schemaName: `${process.env.PG_SCHEMA}`,
    tableName: `${process.env.PG_SESSION_TABLE_NAME}`,
    columns: columnNames
});
app.use(session({
    secret: `${process.env.SESSION_SECRETE}`,
    resave: true,
    saveUninitialized: true,
    store: session_pg_store,
    cookie: {
        secure: (process.env.NODE_ENV == "production")? true : false, // enable only in production mode;
        maxAge: 1000 * 60 * 60 * 24 * 7 // to 7 days
    }
}));
app.use(flash());

// ....
// middleware to access and display all static files
app.use(express.static(path.join(__dirname, "/"))); // VERY IMPORTANT
// ...

// Middleware for RENDERING EJS FILES
app.use("/", route_pages);
app.use("/", route_post);
// ...
// MIDDLEWARE FUNCTION
passport.use(passport_strategy);
passport.use(google_auth20_strategy);
app.use(passport.initialize());
app.use(passport.session())
// ...
// SERVER LISTEN
app.listen(PORT, () => console.log(`Server is listen on port ${PORT}`))
// ....
