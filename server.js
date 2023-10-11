// Pool definition
const pool = require('./lib/pool')

// dotenv configuration
require('dotenv').config()
const { SERVER_PORT, NODE_ENV } = process.env

// express definition
const express = require('express')
const app = express()

// router
const router = require('./src/index.route')

// Template engine
const nunjucks = require('nunjucks')
app.set('view engine', 'html')
nunjucks.configure('templates', {
    express: app,
})

// Middlewares
const cookieParser = require('cookie-parser')
const middleware = require('./src/auth/auth.middleware')
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(middleware.auth)

app.use(router)

app.use((err, req, res, next) => {
    res.render('account/signup.html', {alert: true})
})

// Listen
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