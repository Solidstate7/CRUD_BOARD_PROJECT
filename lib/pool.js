const poolBR = () => {
    let myModule;

    try {
        myModule = require("./poolBR");
        return myModule;
    } catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
            myModule = null;
            return myModule;
        }
    }
};

const poolEJ = () => {
    let myModule;

    try {
        myModule = require("./poolEJ");
        return myModule;
    } catch (e) {
        if (e.code === "MODULE_NOT_FOUND") {
            myModule = null;
            return myModule;
        }
    }
};

const pool = poolBR() || poolEJ();

module.exports = pool;
