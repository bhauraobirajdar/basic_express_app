const express = require('express');

const router = express.Router();

/* GET home page. */
router.use('/home', require('./home').router);
router.use('/user', require('./user').router);

module.exports = router;
