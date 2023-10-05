const noticeService = require("./notice.service");

// notices

// List
exports.getList = async (req, res) => {
    const result = await noticeService.fetchAllNotices();
    res.render("notice/list.html", {list: result, user: req.user});
};

// Write

exports.getWrite = (req, res) => {
    if (!req.user) return res.redirect(`/accounts/signin`)
    if (req.user.lvl !== 2) return res.status(401).send(`관리자만 작성할 수 있습니다.`)

    res.render("notice/write.html", {user: req.user});
};

exports.postWrite = async (req, res) => {
    const created = await noticeService.createNotice(req.body);
    if(!created) return res.status(401).send(`Cannot Write`)
    const { id } = await noticeService.specify(req.body)
    res.redirect(`/notice/view?id=${ id }`);
};

// View
exports.getView = async (req, res) => {
    const result = await noticeService.specifyView(req.query, req.query.id)
    if (!result) return res.status(401).send(`Cannot find this notice.`)
    res.render("notice/view.html", {...result, user: req.user});
};

// Modify
exports.getModify = async (req, res) => {
    if (!req.user) return res.redirect(`/accounts/signin`)
    if (req.user.lvl !== 2) res.status(401).send(`관리자만 수정할 수 있습니다.`)

    const result = await noticeService.specify(req.query);
    if (!result) return res.status(401).send(`Cannot find this notice.`)
    res.render("notice/modify.html", { ...result, user: req.user });
};

exports.postModify = async (req, res) => {
    const { id } = req.query;
    const result = await noticeService.updateNotice(req.body, req.query.id);
    // if (!result)
    //     return res.status(401).send(
    //         "No Change or cannot find the notice to be updated."
    //     );
    res.redirect(`/notice/view?id=${ id }`);
};

// Delete
exports.postDelete = async (req, res) => {
    if (!req.user) return res.redirect(`/accounts/signin`)
    if (req.user.lvl !== 2) return res.status(401).send(`관리자만 삭제할 수 있습니다.`)

    const result = await noticeService.deleteNotice(req.query);
    if(!result) return res.status(401).send(`Cannot delete.`);
    res.redirect(`/notice/list`)
};
