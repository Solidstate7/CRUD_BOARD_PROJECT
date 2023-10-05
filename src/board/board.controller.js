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
    const created = await boardService.createBoard(req.body);
    if(!created) return res.status(401).send(`Cannot Write`)
    const { id } = await boardService.specify(req.body)
    res.redirect(`/boards/view?id=${ id }`);
};

// View
exports.getView = async (req, res) => {
    const result = await boardService.specifyView(req.query, req.query.id)
    if (!result) res.status(401).send(`Cannot find this board.`)
    res.render("board/view.html", {...result, user: req.user});
};

// Modify
exports.getModify = async (req, res) => {
    const result = await boardService.specify(req.query);
    console.log(result, req.user.user_id);
    if (req.user.user_id !== result.author) return res.status(401).send(`작성자만 수정할 수 있습니다.`)

    if (!result) res.status(401).send(`Cannot find this board.`)
    res.render("board/modify.html", { ...result, user: req.user });
};

exports.postModify = async (req, res) => {
    const { id } = req.query;
    const result = await boardService.updateBoard(req.body, req.query.id);
    if (!result)
        res.status(401).send(
            "No Change or cannot find the board to be updated."
        );
    res.redirect(`/boards/view?id=${ id }`);
};

// Delete
exports.postDelete = async (req, res) => {
    const result = await boardService.specify(req.query);
    console.log(result, req.user.user_id);
    if (req.user.user_id !== result.author) return res.status(401).send(`작성자만 삭제할 수 있습니다.`)

    const deleted = await boardService.deleteBoard(req.query);
    if(!deleted) return res.status(401).send(`Cannot delete.`);
    res.redirect(`/boards/list`)
};
