exports.getList = (req, res) => {
    res.render("notice/list.html");
};

exports.getWrite = (req, res) => {
    res.render("notice/write.html");
};

exports.getView = (req, res) => {
    res.render("notice/view.html");
};

exports.getModify = (req, res) => {
    res.render("notice/modify.html");
};
