const authRouter = require('express').Router()

const { login, confirmPassForgot, preRegister, requestPassForgot, register, authOK, confirmCode } = require('../authentication/auth')

authRouter.post('/login', login)
authRouter.post('/confirm/code', confirmCode)
authRouter.get('/register/:email', preRegister)
authRouter.post('/register/create', register)
authRouter.get('/resetPass/:email', requestPassForgot)
authRouter.put('/resetPass/confirm', confirmPassForgot)

module.exports = authRouter