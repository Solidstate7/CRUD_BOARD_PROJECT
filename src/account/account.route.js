const express = require('express')
const router = express.Router()
const accountController = require('./account.controller')

router.get('/signin', accountController.getSignin)
router.get('/signout', accountController.getSignout)
router.post('/signin', accountController.postSignin)

module.exports = router