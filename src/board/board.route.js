const express = require("express");
const router = express.Router();
const boardController = require("./board.controller");

router.get("/list", boardController.getList);
router.get("/write", boardController.getWrite);
router.get("/modify", boardController.getModify);
router.get("/view", boardController.getView);

module.exports = router;
