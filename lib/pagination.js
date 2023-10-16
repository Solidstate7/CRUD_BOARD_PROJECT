class Page {
    limit; // 초기값
    blockSize; // 초기값
    totalBoards; // DB 초기값

    totalPages; // 연산
    currentBlock; // 연산값
    startPage; //연산
    endPage; // 연산

    constructor(limit, blockSize, totalBoards) {
        this.limit = limit;
        this.blockSize = blockSize;
        this.totalBoards = totalBoards;
        this.totalPages = this.totalBoards / this.limit;
        this.currentBlock = Math.ceil(current_page / this.blockSize);
    }
}
