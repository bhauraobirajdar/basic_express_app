const joi = require('joi')
const { sendResponse } = require('../helpers/utils')
const {
  addUserDetails,
  updateUserDetails,
  deleteUserDetails,
  getUserList,
} = require('../services/userService')
const logger = require('../helpers/winston').logger('user.js')

const getUsers = async (req, res, next) => {
  try {
    const userList = await getUserList()
    sendResponse(res, 200, userList.rows)
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

const addUser = async (req, res, next) => {
  try {
    const insertSchema = joi.object().keys({
      emp_name: joi.string().alphanum().min(3).max(30).required(),
      emp_email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    })
    const { error } = insertSchema.validate(req.body, { abortEarly: false })
    if (error) {
      const errMsg = validationResponse(error)
      res.status(422).json({ error: errMsg })
    } else {
      await addUserDetails([req.body.emp_name])
      res.status(201).send('User added successfully')
    }
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const insertSchema = Joi.object().keys({
      emp_name: Joi.string().alphanum().min(3).max(30).required(),
    })

    const { error, value } = insertSchema.validate(req.body)
    console.log(`error ${error} value ${value}`)
    if (error) {
      console.log('Validation error')
      res.status(422).json({ error })
    }
    await updateUserDetails([req.body.emp_name, req.params.id])
    res.status(200).send('User updated successfully')
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}
const deleteUser = async (req, res, next) => {
  try {
    await deleteUserDetails([false, req.params.id])
    res.status(200).send('User delete successfully')
  } catch (err) {
    logger.error(err.message)
    next(err)
  }
}

module.exports = {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
}
