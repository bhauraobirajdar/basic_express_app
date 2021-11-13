const express = require('express')
const { login, verifyLogin } = require('../controllers/loginController')
const router = express.Router()

// Add user to database
router.post('/', login)
router.post('/verify', verifyLogin)

module.exports = {
  router,
}
