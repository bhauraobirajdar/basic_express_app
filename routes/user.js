/* eslint-disable no-restricted-syntax */
// import { sendResponse, validationResponse } from '../helpers/utils';

const express = require("express");

const router = express.Router();
const joi = require("joi");
const logger = require("../helpers/winston").logger("home.js");
const poolCon = require("../db/db");
const queryies = require("../db/query");

const getUsers = async (req, res, next) => {
  try {
    const userList = await poolCon.query(queryies.getUsers);
    sendResponse(res, 200, userList.rows);
  } catch (err) {
    // console.log(err)
    // console.log("error in gwt home", err.stack)
    logger.error(err.message);
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const insertSchema = joi.object().keys({
      emp_name: joi.string().alphanum().min(3).max(30).required(),
      emp_email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    });
    const { error } = insertSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errMsg = validationResponse(error);
      res.status(422).json({ error: errMsg });
    } else {
      await poolCon.query(queryies.addUser, [req.body.emp_name]);
      res.status(201).send("User added successfully");
    }
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

router.get("/", getUsers);

router.post("/", addUser);

const updateUser = async (req, res, next) => {
  try {
    const insertSchema = Joi.object().keys({
      emp_name: Joi.string().alphanum().min(3).max(30).required(),
    });

    const { error, value } = insertSchema.validate(req.body);
    console.log(`error ${error} value ${value}`);
    if (error) {
      console.log("Validation error");
      res.status(422).json({ error });
    }
    const updateUser = await poolCon.query(queryies.updateUser, [
      req.body.emp_name,
      req.params.id,
    ]);
    res.status(200).send("User updated successfully");
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

router.put("/:id", updateUser);

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await poolCon.query(queryies.deleteUser, [
      false,
      req.params.id,
    ]);
    res.status(200).send("User delete successfully");
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

router.delete("/:id", deleteUser);

module.exports = {
  router,
  getUsers,
};
