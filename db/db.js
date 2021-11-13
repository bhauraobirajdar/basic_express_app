/* eslint-disable new-cap */
const pool = require('pg').Pool

const poolCon = new pool({
  user: process.env.PGUSER,
  databse: process.env.PGDATABASE,
  password: process.PGPASSWORD,
  port: process.env.PGPORT,
  host: process.env.PGHOST,
})

module.exports = poolCon
