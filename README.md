# Server AVE (Authenticate via email)
## Basic server with NodeJS, Express, MongoDB, Mongoose, JWT, Nodemailer and OAuth2.
#
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