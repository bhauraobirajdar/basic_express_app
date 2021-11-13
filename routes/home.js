const express = require('express')

const router = express.Router()

const poolCon = require('../db/db')

const logger = require('../helpers/winston').logger('home.js')

const getHome = async (req, res, next) => {
    try {
        const result = await poolCon.query('select * from test_schema.emp')
        res.json(result.rows)
    } catch (err) {
        logger.error(err.message)
        next(err)
    }
}

router.get('/', getHome)

module.exports = {
    router,
    getHome,
}
