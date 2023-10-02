exports.getList = (req, res) => {
    res.render("board/list.html");
};

exports.getNotice = (req, res) => {
    res.render("board/notice.html");
};

exports.getWrite = (req, res) => {
    res.render("board/write.html");
};

exports.getModify = (req, res) => {
    res.render("board/modify.html");
};

exports.getView = (req, res) => {
    res.render("board/view.html");
};
