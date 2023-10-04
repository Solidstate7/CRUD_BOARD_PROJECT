const database = require("../../lib/database");
const jwt = require("../../lib/jwt");

exports.signup = async (obj_input) => {
    try {
        const result = await database.createAccount.execute(obj_input);
        return result;
    } catch (e) {
        throw new Error("accountService Error " + e.message);
    }
};

exports.signin = async (obj_input) => {
    try {
        const result = await database.searchAccount.execute(obj_input);
        if (!result) return {isSignin: false, data: null};

        console.log(result);

        const token = jwt.sign(
            {user_id: result.user_id, lvl: result.lvl},
            "salt"
        );
        return {isSignin: true, data: token};
    } catch (e) {
        throw new Error("accountService Error " + e.message);
    }
};

exports.specifyUser = async (user_info) => {
    try {
        const result = await database.searchAccount.execute(user_info);
        if (!result) return false;
        return result;
    } catch (e) {
        throw new Error('accountService Error ' + e.message);
    }
};


exports.edit = async (obj_input) => {
    try {
        const result = await database.updateAccount.execute(obj_input);
        return result;
    } catch (e) {
        throw new Error("accountService Error " + e.message);
    }
};

exports.delete = async (obj_input) => {
    try {
        const result = await database.deleteAccount.execute(obj_input);
        return result;
    } catch (e) {
        throw new Error("accountService Error " + e.message);
    }
};
