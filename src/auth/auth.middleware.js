const JWT = require('../../lib/jwt')
const accountRepo = require('../account/account.repo')
const jwt = new JWT()

exports.auth = async(req, res, next) => {
    try {
        const { token } = req.cookies

        if(!token) return next()

        const payload = jwt.verify(token, 'salt')
        // console.log('middleware.auth payload: ', payload);
        if(!payload) return res.status(401).send('Invalid Token')

        const user = await accountRepo.searchAccount(payload)
        req.user = user

        next()
    } catch (e) {
        next()
    }
}