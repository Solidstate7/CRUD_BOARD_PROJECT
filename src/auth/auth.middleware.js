const JWT = require('../../lib/jwt')
const accountRepo = require('../account/account.repo')
const jwt = new JWT()

exports.auth = async(req, res, next) => {
    try {
        const { token } = req.cookies
        if(!token) return next()

        const payload = jwt.verify(token, 'salt')
        console.log('middleware.auth payload: ', payload);

        const user = await accountRepo.searchAccount(payload)
        req.user = user

        next()
    } catch (e) {
        next(e)
    }
}