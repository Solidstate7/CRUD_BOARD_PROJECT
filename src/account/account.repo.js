const pool = require('../../lib/poolPromise')

exports.createAccount = async (user_id, user_pw, lvl = 1) => {
    try {
    const sql = `INSERT INTO accounts(user_id, user_pw, lvl) values(?, ?, ?)`
    const valueArr = [user_id, user_pw, lvl]

    const [{affectedRows}] = await pool.query(sql, valueArr)
    console.log(affectedRows);
    console.log('안');
    if(!affectedRows) return false
    console.log('될리없지');
    return true
    } catch (e) {
        throw new Error('Repo Error ', e.message)
    }
}

exports.searchAccount = async (user_id, user_pw) => {
    try {
    const sql = ''
    } catch (e) {

    }

}

exports.modifyAccount = async (user_pw) => {
    try {

    } catch (e) {

    }
}

exports.deleteAccount = async (user_pw) => {
    try {

    } catch (e) {

    }
}

exports.createAccount('eunjae4', '1234');