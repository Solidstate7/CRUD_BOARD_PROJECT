const database = require('../../lib/database')

// List (Read) -> Select All
exports.fetchAllNotices = async (current_page = 1, current_search) => {
    try {
        const limit = 10
        const blockSize = 5
        const currentBlock = Math.ceil(current_page / blockSize)
        const totalNotice = await database.countNoticeData.execute(current_search)

        const totalPages = Math.ceil(totalNotice / limit)
        const startPage = (currentBlock - 1) * blockSize + 1
        const endPage = Math.min(currentBlock * blockSize ,totalPages)

        const result = await database.listNotice.execute(current_page, current_search)
        return { totalPages, startPage, endPage, result }
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

// for (let i = 0; i < 30; i++) {
//     exports.createNotice({title:'나를 찾거라', author:'admin', content:'paging'})
//     exports.createNotice({title:'나를 찾지마', author:'admin', content:'paging'})
//     exports.createNotice({title:'나를 찾아?', author:'admin', content:'paging'})
//     exports.createNotice({title:'나를 찾음', author:'admin', content:'paging'})
// }