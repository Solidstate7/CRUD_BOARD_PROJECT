const boardService = require("./board.service");

// Boards

// List
exports.getList = async (req, res) => {
    const result = await boardService.fetchAllBoards();
    res.render("board/list.html", {list: result, user: req.user});
};

// Write

exports.getWrite = (req, res) => {
    res.render("board/write.html", {user: req.user});
};

exports.postWrite = async (req, res) => {
    const result = boardService.createBoard(req.body);
    res.redirect(`/boards/view?id=${result.id}`, {...result});
};

// View
exports.getView = (req, res) => {
    res.render("board/view.html", {user: req.user});
};

// Modify
exports.getModify = (req, res) => {
    const result = boardService.specify(req.query.id);
    res.render("board/modify.html", {user: req.user});
};

exports.postModify = (req, res) => {
    const {id} = req.query;
    const result = boardService.updateBoard(req.body);
    if (!result)
        res.status(401).send(
            "No Change or cannot find the board to be updated."
        );
    res.redirect(`/boards/view?id=${id}`);
};

// Delete
exports.postDelete = (req, res) => {
    const result = boardService.deleteBoard(req.query.id);
};
