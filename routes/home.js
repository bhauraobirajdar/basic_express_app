const express = require('express');

const router = express.Router();

const poolCon = require('../db/db');

const logger = require('../helpers/winston').logger('home.js');

const User = require('../models/user');

const userModel = new User.User();

const getHome = (async (req, res) => {
  try {
       const result = await userModel.addUser(); //
       console.log("resssss ",result)
    //return result;
    res.json(result);
  } catch (err) {
    console.log('in errorrrrrrrrrr');
    // console.log("error in gwt home", err.stack)
    logger.error(err.message);
    return 'error';
    // next(err);
  }
});

router.get('/', getHome);

module.exports = {
  router,
  getHome,
};
