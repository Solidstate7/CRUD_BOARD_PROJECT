const database = require('../../lib/database')

// List (Read) -> Select All
exports.fetchAllBoards = async (obj_data) => {
    try {
        const result = await database.listBoard.execute(obj_data)
        return result
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
exports.specifyView = async (obj_data) => {
    const result = await database.searchBoard.execute(obj_data)
    result.hit++
    console.log(result.hit);
    const {id, ...rest} = result
    const newResult = await database.updateBoard.execute(rest)
    return newResult
}

// View without increasing hit
exports.specify = async (obj_data) => {
    const result = await database.searchBoard.execute(obj_data)
    return result
}

// Modify (Update)
exports.updateBoard = async (obj_data) => {
    const {id, ...rest} = obj_data
    const result = await database.updateBoard.execute(rest)
    console.log(result);
    return result
}

// Delete
exports.deleteBoard = async (obj_data) => {
    const result = await database.deleteBoard.execute(obj_data)
    console.log(result);
    return result
}