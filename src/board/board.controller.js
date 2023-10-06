const boardService = require("./board.service");
const Time = require('../../lib/date')

// Boards

// List
exports.getList = async (req, res) => {
    const currentPage = req.query.page ? parseInt(req.query.page) : 1
    const currentSearch = req.query.search
    const { totalPages, startPage, endPage, result,}  = await boardService.fetchAllBoards(currentPage, currentSearch);
    
    if(!result) return res.redirect('/boards/list')

    const dateArr = result.map(board => new Time(board.date).getDate())
    const renderObj = {list: result, time: dateArr, totalPages, startPage, endPage, user: req.user, current_search: currentSearch}
    res.render("board/list.html", renderObj);
};

// Write

exports.getWrite = (req, res) => {
    if (!req.user) return res.redirect(`/accounts/signin`)
    res.render("board/write.html", {user: req.user});
};

exports.postWrite = async (req, res) => {
    const created = await boardService.createBoard(req.body);
    if (!created) return res.status(401).send(`Cannot Write`);
    const {id} = await boardService.specify(req.body);
    res.redirect(`/boards/view?id=${id}`);
};

// View
exports.getView = async (req, res) => {
    const result = await boardService.specifyView(req.query, req.query.id);
    if (!result) return res.status(401).send(`Cannot find this board.`);
    const date = new Time(result.date).getDate()
    res.render("board/view.html", {...result, time: date, user: req.user});
};

// Modify
exports.getModify = async (req, res) => {
    if (!req.user) return res.redirect(`/accounts/signin`)
    
    const result = await boardService.specify(req.query);

    if (req.user.user_id !== result.author)
        return res.status(401).send(`작성자만 수정할 수 있습니다.`);

    if (!result) return res.status(401).send(`Cannot find this board.`);
    res.render("board/modify.html", {...result, user: req.user});
};

exports.postModify = async (req, res) => {
    const {id} = req.query;
    const result = await boardService.updateBoard(req.body, req.query.id);

    // if (!result) return res.status(401).send("No Change or cannot find the board to be updated.");
    res.redirect(`/boards/view?id=${ id }`);
};

// Delete
exports.postDelete = async (req, res) => {
    if (!req.user) return res.redirect(`/accounts/signin`)

    const result = await boardService.specify(req.query);

    if (req.user.user_id !== result.author)
        return res.status(401).send(`작성자만 삭제할 수 있습니다.`);

    const deleted = await boardService.deleteBoard(req.query);
    if (!deleted) return res.status(401).send(`Cannot delete.`);
    res.redirect(`/boards/list`);
};
