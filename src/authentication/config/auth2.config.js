const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const { AUTH_ID_CLIENT, AUTH_SECRET_CLIENT, AUTH_REFRESH_TOKEN } = process.env
const token = require('./token.json')

const getGoogleAuth = async() => {
    const authClient = new OAuth2(AUTH_ID_CLIENT, AUTH_SECRET_CLIENT, "https://developers.google.com/oauthplayground")

    authClient.setCredentials({
        refresh_token: AUTH_REFRESH_TOKEN,
        tls: { rejectUnathorized: false }
    })

    authClient.getAccessToken((err, refreshToken) => {
        err ? console.log('> Error al obtener OAuth2 token:', err) : token.accessToken = refreshToken
    })
}

module.exports = { getGoogleAuth }