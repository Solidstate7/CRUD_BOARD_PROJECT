const express = require("express");
const router = express.Router();
const noticeController = require("./notice.controller");

router.get("/list", noticeController.getList);

router.get("/write", noticeController.getWrite);
router.post("/write", noticeController.postWrite);

router.get("/view", noticeController.getView);

router.get("/modify", noticeController.getModify);
router.post("/modify", noticeController.postModify);

router.post("/delete", noticeController.postDelete);

module.exports = router;
