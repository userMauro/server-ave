const User = require('../models/User')

const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

console.log('> server AVE by usermauro')
const { validate } = require('./config/regex.config')
const { sendEmail } = require('./config/nodemailer.config')
const { createToken, checkToken } = require('./config/jwt.config')

const authOK = (req, res, next) => {
    // middleware para chequear auth en endpoints

    try {
        const auth = req.get('authorization');     // recupera la cabecera http 'authorization' (es de express)

        let token = null;

        // la cabecera sería algo asi: 'Bearer kjgalksdkglahsdalk'
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            token = auth.substring(7);
        };

        if (!checkToken(token)) {
            return res.status(401).json({status: false, msg: 'Token missing or invalid'});
        };

        next()
        // return res.status(200).json({status: true, msg: 'Credentials are ok'})
    } catch (error) {
        next(error);
    };
}

const confirmCode = (req, res, next) => {
    try {
        const { email, token, code } = req.body

        const data = checkToken(token)

        if (email === data.email && code === data.code) {
            return res.status(200).json({status: true, msg: 'Email verified successfully'})
        } else {
            return res.status(401).json({status: false, msg: 'Token invalid or expired'})
        }
    } catch (error) {
        next(error)
    }
}

const preRegister = async (req, res, next) => {
    try {
        const { email } = req.params

        // regex para email
        if (!validate(email, 'email')) {
            return res.status(401).json({status: false, msg: 'Invalid characters in email'})
        }

        // chequeo no repetir email
        const exists = await User.findOne({email})
        if (exists) return res.status(401).json({status: false, msg: 'Email already exists'})

        // creo el código aleatorio
        const code = uuidv4().slice(0, 6)

        // creo un token
        const token = createToken({email, code}, "60s") // 60s
        sendEmail({email, type: 'verify', data: {token, code}}, res, next)
    } catch (error) {
        return next(error)
    }
}

const register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body

        // regex para email/username
        if (!validate(email, 'email') || (!validate(username, 'username')))  {
            return res.status(401).json({status: false, msg: 'Invalid characters in email/username'})
        }

        // chequeo no repetir email
        const exists = await User.findOne({email})
        if (exists) return res.status(401).json({status: false, msg: 'Email already in use'})


        // hash passwd
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username,
            email,
            passwordHash,
            role: 'user',
        })

        await user.save()

        await sendEmail({email, type: 'welcome', data: username}, res, next) 
    } catch (error) {
        return next(error)
    };
}

const login = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        // regex para email
        if (!validate(email, 'email')) {
            return res.status(401).json({status: false, msg: 'Invalid characters in email'})
        }

        // reviso si ya está logueado
        const logged = req.get('authorization');
        if (logged && logged.toLowerCase().startsWith('bearer')) {
            return res.status(401).json({status: false, msg: 'There is an account already logged in'})
        }

        const user = await User.findOne({ email });
    
        const passwordCorrect = (user === null) 
            ? false
            : await bcrypt.compare(password, user.passwordHash)
        
        if (!passwordCorrect) return res.status(401).json({status: false, msg: 'Invalid email/password'})

        // si logueo bien, agrego la data que va a ir en el token codificado
        const data = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        const { username, role} = user

        const token = createToken(data, '30d')
        return res.send({status: true, msg: {username, email, role, token}})
    } catch (error) {
        return next(error);
    };
}

const requestPassForgot = async(req, res, next) => {
    try {
        const { email } = req.params

        // regex para email
        if (!validate(email, 'email')) {
            return res.status(401).json({status: false, msg: 'Invalid characters in email'})
        }

        // chequeo encontrar mail
        const exists = await User.findOne({email})
        if (!exists) return res.status(401).json({status: false, msg: 'Email not founded in database'})

        // creo el código aleatorio
        const code = uuidv4().slice(0, 6)

        // creo un token
        const token = createToken({email, code}, "60s")
        await sendEmail({email, type: 'requestPassForgot', data: {token, code}}, res, next)
    } catch (error) {
        next(error)
    }
}

const confirmPassForgot = async(req, res, next) => {
    try {
        const { email, password } = req.body

        // regex para email
        if (!validate(email, 'email')) {
            return res.status(401).json({status: false, msg: 'Invalid characters in email'})
        }

        // chequeo encontrar mail
        const user = await User.findOne({email})
        if (!user) return res.status(401).json({status: false, msg: 'Email not founded in database'})

        // hash passwd
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)

        user.passwordHash = passwordHash
        user.save()

        sendEmail({email, type: 'confirmPassForgot'}, res, next)
    } catch (error) {
        return next(error);
    }
}

module.exports = { preRegister, register, login, authOK, requestPassForgot, confirmPassForgot, confirmCode };