const database = require('../../lib/database')

// List (Read) -> Select All
exports.fetchAllBoards = async (current_page = 1, current_search) => {
    try {
        const limit = 10
        const blockSize = 5
        const currentBlock = Math.ceil(current_page / blockSize)
        const totalBoards = await database.countBoardData.execute(current_search);

        const totalPages = Math.ceil(totalBoards / limit)
        const startPage = (currentBlock - 1) * blockSize + 1
        const endPage = Math.min(currentBlock * blockSize, totalPages)

        const result = await database.listBoard.execute(current_page, current_search)
        return { totalPages, startPage, endPage, result }
    } catch (e) {
        throw new Error('boardService Error: ' + e.message)
    }
}
// Write (Create)
exports.createBoard = async (obj_data) => {
    const result = await database.createBoard.execute(obj_data)
    return result
}

// View (Read / Hit Increment)
exports.specifyView = async (obj_data, finder) => {
    const result = await database.searchBoard.execute(obj_data)
    result.hit++
    const {id, ...rest} = result
    await database.updateBoard.execute(rest, finder)
    const newResult = await database.searchBoard.execute(obj_data)
    return newResult
}

// View without increasing hit
exports.specify = async (obj_data) => {
    const result = await database.searchBoard.execute(obj_data)
    return result
}

// Modify (Update)
exports.updateBoard = async (obj_data, finder) => {
    const {id, ...rest} = obj_data
    const result = await database.updateBoard.execute(rest, finder)
    return result
}

// Delete
exports.deleteBoard = async (obj_data) => {
    const result = await database.deleteBoard.execute(obj_data)
    return result
}

for (let i = 0; i < 3; i++) {
    exports.createBoard({title:'나를 찾거라', author:'admin', content:'paging'})
    exports.createBoard({title:'나를 찾지마', author:'admin', content:'paging'})
    exports.createBoard({title:'나를 찾아?', author:'admin', content:'paging'})
    exports.createBoard({title:'나를 찾음', author:'admin', content:'paging'})
}