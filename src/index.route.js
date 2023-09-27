const express = require('express')
const router = express.Router()
const accountRouter = require('./account/account.route')
const boardRouter = require('./board/board.route')

router.get('/' , (req, res) => {
    console.log("INDEX ROUTER: ", req.user);
    res.render('index.html', { user: req.user })
})

router.use('/accounts', accountRouter)

router.use('/boards', boardRouter)

module.exports = router