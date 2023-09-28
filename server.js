const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const { SERVER_PORT, NODE_ENV } = require('dotenv')
const router = require('./src/index.route')
const pool = require('./lib/poolPromise')
const cookieParser = require('cookie-parser')
const middleware = require('./src/auth/auth.middleware')

app.set('view engine', 'html')
nunjucks.configure('templates', {
    express: app,
})

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(middleware.auth)

app.use(router)

app.listen(SERVER_PORT || 3000, async () => {
    try {
        const connection = await pool.getConnection()
        console.log('DB Connected');
        connection.release()
    } catch (e) {
        throw new Error("SERVER ERROR ", e.message)
    }
    console.log(`Server Listening on Port ${SERVER_PORT}`);
})