// Notice

//List
exports.getNotice = (req, res) => {
    res.render("board/notice.html", {user: req.user});
};

// Write
exports.getWrite = (req, res) => {
    if (req.user.lvl !== 2) return res.send("꼬우면 관리자 하든가");
};
// View

// Modify

// Delete

exports.getList = (req, res) => {
    res.render("notice/list.html", {user: req.user});
};

exports.getWrite = (req, res) => {
    res.render("notice/write.html", {user: req.user});
};

exports.getView = (req, res) => {
    res.render("notice/view.html", {user: req.user});
};

exports.getModify = (req, res) => {
    res.render("notice/modify.html", {user: req.user});
};
