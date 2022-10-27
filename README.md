# Server AVE (Authenticate via email)
## Basic server with NodeJS, Express, MongoDB, Mongoose, JWT, Nodemailer and OAuth2.

Authentication system via email (send confirmation from a Gmail account). When registering, a code inside a token (with 60 seconds validity) is sent to the user's email to confirm their identity. The same to recover your password in case you forget it.

## Before you start, read everything!

1. Clone repository
2. Install dependencies
    > $ npm install
3. Create .env
4. Configure your gmail with the help of this [video](https://www.youtube.com/watch?v=W3jGtgva46w&t=151s&ab_channel=JuanPabloGuaman)
5. Start your server
    > $ npm start

#
### .env
```
# server PORT
PORT=3001

# mongodb
MONGODB_URI=""                 

# secret JWT
SECRET=""

# oauth google
AUTH_ID_CLIENT=""
AUTH_SECRET_CLIENT=""
AUTH_REFRESH_TOKEN=""

# gmail credentials
NODEMAILER_USER=""
NODEMAILER_PASS=""
```
#
### "MONGODB_URI"
You can get information [here](https://www.mongodb.com/docs/manual/reference/connection-string/)

### "OAUTH GOOGLE CREDENTIALS"
Step 4
#

## TO KEEP IN MIND!
### - Gmail refresh token
In the video of step 4 the "refresh_token" expires in about a week, I am looking for how to renew it automatically, so in the meantime you have to renew it manually.
> AUTH_REFRESH_TOKEN=""

### - Middleware authorization
When adding more routes that need authorization, use "authOK" function as middleware, example in "/routes/index.js".