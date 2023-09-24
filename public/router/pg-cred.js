const pg = require("pg");
require("dotenv").config();


const isProduction = process.env.NODE_ENV == "production"; 
const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`

const pool = new pg.Pool({
    connectionString: (isProduction) ? process.env.NODE_ENV : connectionString
});

module.exports = pool;