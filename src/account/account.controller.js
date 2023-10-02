const accountService = require("./account.service");

exports.getSignin = (req, res) => {
    res.render("account/signin.html");
};

exports.getSignout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
};

exports.postSignin = async (req, res, next) => {
    try {
        const result = await accountService.signin(req.body);

        if (!result.isSignin)
            return res.status(401).send("Invalid ID or Password.");

        res.cookie("token", result.data);
        res.redirect("/");
    } catch (e) {
        next(e);
    }
};

exports.getSignup = (req, res) => {
    res.render("account/signup.html");
};
