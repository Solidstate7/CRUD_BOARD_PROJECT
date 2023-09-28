const pool = require('../../lib/poolPromise')

exports.createAccount = async (user_id, user_pw, lvl = 1) => {
    try {
    const sql = `INSERT INTO accounts(user_id, user_pw, lvl) values(?, ?, ?)`
    const valueArr = [user_id, user_pw, lvl]

    const [{affectedRows}] = await pool.query(sql, valueArr)
    
    if(!affectedRows) return false
    return true

    } catch (e) {
        throw new Error('Repo Error ', e.message)
    }
}

exports.searchAccount = async (user_id, user_pw) => {
    try {
    const sql = `SELECT * FROM accounts WHERE user_id=? AND user_pw=?`
    const valueArr = [user_id, user_pw]

    const [[result]] = await pool.query(sql, valueArr)

    return result

    } catch (e) {
        throw new Error('Repo Error ', e.message)
    }

}

exports.updateAccount = async (new_pw, user_pw) => {
    try {
    const sql = `UPDATE accounts SET user_pw=? WHERE user_pw=?`
    const valueArr = [new_pw, user_pw]

    const [{changedRows}] = await pool.query(sql, valueArr)
    
    if (!changedRows) return false
    return true

    } catch (e) {
        throw new Error('Repo Error ', e.message)
    }
}

exports.deleteAccount = async (user_pw) => {
    try {
    const sql = `DELETE FROM accounts WHERE user_pw=?`
    const valueArr = [user_pw]
    
    const [{affectedRows}] = await pool.query(sql, valueArr)

    if (!affectedRows) return false
    return true

    } catch (e) {
        throw new Error('Repo Error ', e.message)
    }
}

exports.createAccount('eunjae', '1234');
exports.deleteAccount('1234');