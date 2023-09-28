const accountRepo = require('./account.repo')
const JWT = require('../../lib/jwt')
const jwt = new JWT()

exports.signup = async (user_id, user_pw) => {
    try {
        console.log('Under construction');
    } catch (e) {
        throw new Error('accountService Error ' + e.message)
    }
}

exports.signin = async (obj_data) => {
    try {

    const result = await accountRepo.searchAccount(obj_data)
    if (!result) return { isSignin: false, data: null }
        console.log(result)
    const token = jwt.sign( { user_id: result.user_id }, 'salt' )
    return { isSignin: true, data: token }


    } catch (e) {
        throw new Error('accountService Error ' + e.message)
    }
}

exports.edit = async (user_pw) => {
    try {
    console.log('Under construction');
    } catch (e) {
        throw new Error('accountService Error ' + e.message)
    }
}

exports.delete = async (user_pw) => {
    try {
    console.log('Under construction');
    } catch (e) {
        throw new Error('accountService Error ' + e.message)
    }
}