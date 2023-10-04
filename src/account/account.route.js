const express = require("express");
const router = express.Router();
const accountController = require("./account.controller");

router.get("/signin", accountController.getSignin);
router.post("/signin", accountController.postSignin);

router.get("/signup", accountController.getSignup);
router.post("/signup", accountController.postSignup);

router.get("/signout", accountController.getSignout);

router.get("/mypage", accountController.getMypage);
router.get("/modify", accountController.getEdit);
router.post("/modify", accountController.postEdit);

router.post("/delete", accountController.postDelete);

module.exports = router;
