const database = require('../../lib/database')

// List (Read) -> Select All
exports.fetchAllNotices = async () => {
    try {
        const result = await database.listNotice.execute()
        return result
    } catch (e) {
        throw new Error('NoticeService Error: ' + e.message)
    }
}
// Write (Create)
exports.createNotice = async (obj_data) => {
    const result = await database.createNotice.execute(obj_data)
    return result
}

// View (Read / Hit Increment)
exports.specifyView = async (obj_data, finder) => {
    const result = await database.searchNotice.execute(obj_data)
    result.hit++
    const {id, ...rest} = result
    await database.updateNotice.execute(rest, finder)
    const newResult = await database.searchNotice.execute(obj_data)
    return newResult
}

// View without increasing hit
exports.specify = async (obj_data) => {
    const result = await database.searchNotice.execute(obj_data)
    return result
}

// Modify (Update)
exports.updateNotice = async (obj_data, finder) => {
    const {id, ...rest} = obj_data
    const result = await database.updateNotice.execute(rest, finder)
    return result
}

// Delete
exports.deleteNotice = async (obj_data) => {
    const result = await database.deleteNotice.execute(obj_data)
    console.log(result);
    return result
}