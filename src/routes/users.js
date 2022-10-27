const userRouter = require('express').Router()

const { getAllUsers } = require('../controllers/users.controller')

userRouter.get('/getAll', getAllUsers)

module.exports = userRouter