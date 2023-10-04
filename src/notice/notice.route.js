const express = require("express");
const router = express.Router();
const noticeController = require("./notice.controller");

router.get("/list", noticeController.getList);

router.get("/write", noticeController.getWrite);

router.post("/write");

router.get("/view", noticeController.getView);

router.get("/modify", noticeController.getModify);

router.post("/modify");

router.post("/delete");

module.exports = router;
