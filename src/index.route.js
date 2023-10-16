const express = require("express");
const router = express.Router();
const accountRouter = require("./account/account.route");
const boardRouter = require("./board/board.route");
const noticeRouter = require("./notice/notice.route");

router.get("/", (req, res) => {
    // console.log("INDEX ROUTER: ", req.user);
    res.render("index.html", { user: req.user });
});

router.use("/accounts", accountRouter);

router.use("/boards", boardRouter);

router.use("/notice", noticeRouter);

module.exports = router;
