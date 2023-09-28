const JWT = require('../../lib/jwt')
const accountService = require('../account/account.service')
const jwt = new JWT()

exports.auth = async(req, res, next) => {
    try {
        const { token } = req.cookies
        if(!token) return next()

        const payload = jwt.verify(token, 'salt')
        console.log('middleware.auth payload: ', payload);

        const user = await accountService.method(payload.id)
        req.user = user

        next()
    } catch (e) {
        next(e)
    }
}