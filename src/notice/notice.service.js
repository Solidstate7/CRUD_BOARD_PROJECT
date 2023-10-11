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

// for (let i = 0; i < 10; i++) {
//     exports.createNotice({title:'새로운 강사진 소개', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 3 })
//     exports.createNotice({title:'행정부서 연락처 안내', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 5 })
//     exports.createNotice({title:'교재 지급 리스트', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 1 })
//     exports.createNotice({title:'무선인터넷 수리 일정 안내', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 4 })
//     exports.createNotice({title:'기업 리스트 안내드립니다', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 6 })
//     exports.createNotice({title:'추석연휴 기간 안내입니다', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 5 })
//     exports.createNotice({title:'5층 화장실 리모델링 예정 날짜 안내', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 4 })
//     exports.createNotice({title:'훈련장려금 지급 날짜', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 5 })
//     exports.createNotice({title:'에너지드링크 냉장고 설치 예정 날짜 안내', author:'admin', content:'담당자가 휴가기간이라 자세한 내용은 추후에 업데이트 하겠습니다.', category: 4 })
// }
