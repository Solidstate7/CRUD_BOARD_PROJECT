const accountService = require("./account.service");

// Create
exports.getSignup = (req, res) => {
    res.render("account/signup.html");
};

exports.postSignup = async (req, res) => {
    try {
        const result = await accountService.signup(req.body);

        if (!result)
            return res.status(401).send(`Cannot create an invalid account.`);

        res.redirect("/");
    } catch (e) {
        next(e);
    }
};

// Read
exports.getSignin = (req, res) => {
    res.render("account/signin.html");
};

exports.postSignin = async (req, res, next) => {
    try {
        const result = await accountService.signin(req.body);

        if (!result.isSignin)
            return res.status(401).send(`Invalid ID or Password.`);

        res.cookie("token", result.data);
        res.redirect("/");
    } catch (e) {
        next(e);
    }
};

exports.getSignout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};

// Update

exports.getEdit = async (req, res) => {
    const result = await accountService.edit(req.body);
    if (!result) return res.status(401).send(`This user doesn't exist`);
    res.render("account/mypage_modify.html", {...result});
};

exports.postEdit = async (req, res) => {};

// Delete

exports.postDelete = async (req, res) => {
    const result = await accountService.delete(req.body);

    if (!result)
        return res.status(401).send(`Cannot delete a nonexistent user.`);

    res.clearCookie("token");
    res.redirect("/");
};

exports.getMypage = (req, res) => {
    res.render("account/mypage.html");
};
