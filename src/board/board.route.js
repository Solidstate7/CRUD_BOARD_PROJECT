const express = require("express");
const router = express.Router();
const boardController = require("./board.controller");

router.get("/list", boardController.getList);
router.get("/notice", boardController.getNotice);

module.exports = router;
