const router = require('express').Router()

// middleware
const { authOK } = require('../authentication/auth')

// routes
const auth = require('./auth')
const users = require('./users')
const notFound = require('../utils/notFoundHandler')

router.use('/auth', auth)
router.use('/users', authOK, users)
router.use('*', notFound)

module.exports = router