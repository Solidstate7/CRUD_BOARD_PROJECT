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

        const signResult = await accountService.signin(req.body);

        if (!signResult.isSignin)
            return res.status(401).send(`Invalid ID or Password.`);

        res.cookie("token", signResult.data);
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

exports.getMypage = async (req, res, next) => {
    try {
        if (!req.user) return res.redirect("/accounts/signin");
        const account = await accountService.specifyUser(req.user);
        if (!account) return res.status(401).send(`This user doesn't exist`);
        res.render("account/mypage.html", {...account});
    } catch (e) {
        next(e);
    }
};

// Update

exports.getEdit = async (req, res) => {
    const account = await accountService.specifyUser(req.user);
    if (!account) return res.status(401).send(`This user doesn't exist`);
    res.render("account/mypage_modify.html", {...account});
};

exports.postEdit = async (req, res) => {
    const updated = await accountService.edit(req.body);
    if (!updated)
        return res.status(401).send(`No change or cannot Update this user.`);
    res.redirect("/accounts/mypage");
};

// Delete

exports.postDelete = async (req, res) => {
    const result = await accountService.delete(req.body);

    if (!result)
        return res.status(401).send(`Cannot delete a nonexistent user.`);

    res.clearCookie("token");
    res.redirect("/");
};
