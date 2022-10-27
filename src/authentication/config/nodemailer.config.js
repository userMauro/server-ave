const nodemailer = require("nodemailer");

const { NODEMAILER_USER, AUTH_ID_CLIENT, AUTH_SECRET_CLIENT } = process.env
const { getGoogleAuth } = require('./auth2.config')
const token = require('./token.json')


const sendEmail = async(req, res, next) => {
    try {
        const { email, type, data } = req

        await getGoogleAuth()

        const { subject, text, html} = message(type, data)

        // espero 3 segundos para obtener con seguridad el token de OAuth2
        setTimeout(() => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: NODEMAILER_USER,
                    clientId: AUTH_ID_CLIENT,
                    clientSecret: AUTH_SECRET_CLIENT,
                    refreshToken: token.accessToken
                }
            })

            let emailDetail = {
                from: NODEMAILER_USER,
                to: email,
                subject,
                text,
                html
            }

            transporter.sendMail(emailDetail, (error) => {
                if (error) {
                    return res.status(404).json({status: false, msg: error.message})
                } else {
                    return res.status(200).json({status: true, msg: data?.token})
                }
            })
        }, 3000)
    } catch (error) {
        next(error)
    }
}

const message = (type, data) => {
    switch(type) {
        case "verify":
            return mail = {
                subject: "Confirmar email Mercado Bue!",
                text: "",
                html: `<h1>${data.code}</h1>`, 
            }
        case "welcome":
            return mail = {
                subject: `Bienvenida/o a Mercado Bue!`,
                text: "",
                html: `<p>Hola ${data}! Antes de empezar a comprar o vender, te aconsejamos que leas nuestros tips:</p>`
            }
        case "requestPassForgot":
            return mail = {
                subject: "Recuperar contraseña Mercado Bue!",
                text: "",
                html: `<h1>${data.code}</h1>`, 
            }
        case "confirmPassForgot":
            return mail = {
                subject: "Nueva contraseña Mercado Bue!",
                text: "",
                html: `<p>Tu contraseña fue cambiada exitosamente.</p>`, 
            }
        default:
            break
    }
}

module.exports = { sendEmail }