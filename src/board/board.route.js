const express = require("express");
const router = express.Router();
const boardController = require("./board.controller");

router.get("/list", boardController.getList);

router.get("/write", boardController.getWrite);
router.post("/write", boardController.postWrite);

router.get("/view", boardController.getView);

router.get("/modify", boardController.getModify);
router.post("/modify", boardController.postModify);

router.post("/delete", boardController.postDelete);

module.exports = router;
