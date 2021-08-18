const express = require('express');

const router = express.Router();

const logger = require('../utils/winston').logger('home.js');

const getUsers = (async (req, res, next) => {
  try {
    res.json({ title: 'list of users' });
  } catch (err) {
    // console.log(err)
    // console.log("error in gwt home", err.stack)
    logger.error(err.message);
    next(err);
  }
});

router.get('/', getUsers);

module.exports = {
  router,
  getUsers,
};
