const joi = require('joi')
const bcrypt = require('bcrypt')
const sql = require('../db/query')
const logger = require('../helpers/winston').logger('login.js')
const poolCon = require('../db/db')
const {
  sendResponse,
  validationResponse,
  createJWT,
  executeQuery,
} = require('../helpers/utils')
const {
  USER_EXISTS,
  USER_SUCCESS,
  PASSWORD_NOT_MATCHED,
} = require('../Utils/constants')

const login = async (req, res, next) => {
  try {
    const insertSchema = joi.object().keys({
      userName: joi.string().alphanum().min(3).max(30).required(),
      password: joi.string().required(),
    })
    const { err } = insertSchema.validate(req.body, { abortEarly: false })
    if (err) {
      const errMsg = validationResponse(err)
      sendResponse(res, 422, { error: errMsg })
    } else {
      const userExsist = await poolCon.query(sql.getUserByUserName, [
        req.body.userName,
      ])
      if (userExsist.rows.length > 0) {
        sendResponse(res, 200, { msg: USER_EXISTS })
      } else {
        const encryptPass = await bcrypt.hash(req.body.password, 10)
        await executeQuery(sql.addUser, [req.body.userName, encryptPass])
        sendResponse(res, 201, { msg: USER_SUCCESS })
      }
    }
  } catch (e) {
    logger.error(`Error occured in login ${e.message} `)
    next(e)
  }
}

const verifyLogin = async (req, res, next) => {
  try {
    const insertSchema = joi.object().keys({
      userName: joi.string().alphanum().min(3).max(30).required(),
      password: joi.string().required(),
    })

    const { err } = insertSchema.validate(req.body, { abortEarly: false })
    if (err) {
      const errMsg = validationResponse(err)
      res.status(422).json({ error: errMsg })
    } else {
      const userData = await executeQuery(sql.getUserByUserName, [
        req.body.userName,
      ])
      const checkPass = await bcrypt.compare(
        req.body.password,
        userData.rows[0].password
      )
      if (checkPass) {
        const jwtToken = createJWT(userData.rows[0])
        sendResponse(res, 200, { token: jwtToken })
      } else {
        sendResponse(res, 401, { errorMsg: PASSWORD_NOT_MATCHED })
      }
    }
  } catch (e) {
    logger.error(`Error occured in login ${e.message} `)
    next(e)
  }
}

module.exports = {
  login,
  verifyLogin,
}
