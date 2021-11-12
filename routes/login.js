const { sendResponse, validationResponse } = require('../helpers/utils');

const express = require('express');
const Joi = require('joi');

const router = express.Router();
const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const queryies = require('../db/query');
const logger = require('../helpers/winston').logger('home.js');
const poolCon = require('../db/db');

// Add user to database
const login = (async (req, res, next) => {
  try {
    const insertSchema = joi.object().keys({
      userName: Joi.string().alphanum().min(3).max(30)
        .required(),
      password: joi.string().required(),
    });

    const { err } = insertSchema.validate(req.body, { abortEarly: false });
    if (err) {
      const errMsg = validationResponse(err);
      sendResponse(res, 422, { error: errMsg });
    } else {
      const userExsist = await poolCon.query(queryies.getUserByUserName, [req.body.userName]);
      console.log('usernameeeeeee ', userExsist.rows);
      if (userExsist.rows.length > 0) {
        sendResponse(res, 200, {msg: 'User already exist' });
      } else {
        const encryptPass = await bcrypt.hash(req.body.password, 10);
        await poolCon.query(queryies.addUser, [req.body.userName, encryptPass]);
        sendResponse(res, 201, { msg: 'User added successfully' });
      }
    }
  } catch (e) {
    logger.error(`Error occured in login ${e.message} `);
    next(e);
  }
});
router.post('/', login);

function createJWT(userData) {
  const token = jwt.sign(
    {
      data: userData,
    },
    process.env.SECREAT,
    {
      expiresIn: '1h',
    },
  );
  return token;
}
const verifyLogin = (async (req, res, next) => {
  try {
    const insertSchema = joi.object().keys({
      userName: Joi.string().alphanum().min(3).max(30)
        .required(),
      password: joi.string().required(),
    });

    const { err } = insertSchema.validate(req.body, { abortEarly: false });
    if (err) {
      const errMsg = validationResponse(err);
      res.status(422).json({ error: errMsg });
    } else {
      const userData = await poolCon.query(queryies.getUserByUserName, [req.body.userName]);
      const checkPass = await bcrypt.compare(req.body.password, userData.rows[0].password);
      if (checkPass) {
        const jwtToken = createJWT(userData.rows[0]);
        sendResponse(res, 200, { token: jwtToken });
      } else {
        sendResponse(res, 401, { errorMsg: 'Password not match' });
      }
    }
  } catch (e) {
    logger.error(`Error occured in login ${e.message} `);
    next(e);
  }
});
router.post('/verify', verifyLogin);

module.exports = {
  router,
  login,
};
