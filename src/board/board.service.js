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

// for (let i = 0; i < 10; i++) {
//     exports.createBoard({title:'개강 예정인 수업들이 있나요?', author:'boram', content:'빠른 답변 부탁드립니다.', category: 5})
//     exports.createBoard({title:'플밍반에서는 어떤 것들을 배우나요?', author:'boram', content:'빠른 답변 부탁드립니다.', category: 1})
//     exports.createBoard({title:'어떤 책들로 수업하는지 미리 알고싶어요', author:'boram', content:'빠른 답변 부탁드립니다.', category: 2})
//     exports.createBoard({title:'취업률은 어떻게 되나요?', author:'boram', content:'빠른 답변 부탁드립니다.', category: 6})
//     exports.createBoard({title:'훈련장려금 지급 날짜 좀 지켜주세요~', author:'boram', content:'빠른 답변 부탁드립니다.', category: 5})
//     exports.createBoard({title:'5층 화장실 너무 너무 불편해요', author:'boram', content:'빠른 답변 부탁드립니다.', category: 4})
//     exports.createBoard({title:'혹시 교수님이 바뀔 수도 있나요?', author:'boram', content:'빠른 답변 부탁드립니다.', category: 3})
//     exports.createBoard({title:'에너지드링크 냉장고 설치해주세요', author:'boram', content:'빠른 답변 부탁드립니다.', category: 4})
//     exports.createBoard({title:'와이파이 문제가 자꾸 생기는데 수리 요청 좀 해주세요.', author:'boram', content:'빠른 답변 부탁드립니다.', category: 4}) 
// }