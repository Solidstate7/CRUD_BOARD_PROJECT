const accountService = require('./account.service')

exports.getSignin = (req, res) => {
    res.render('signin.html')
}

exports.getSignout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
}

exports.postSignin = async (req, res, next) => {
    try {
    
    const result = await accountService.signin(req.body)

    if(!result.isSignin) return res.redirect('/')

    res.cookie('token', result.data)
    res.redirect('/')
    } catch (e) {
        next()
    }
}