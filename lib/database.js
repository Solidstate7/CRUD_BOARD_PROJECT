// Pool definition
const pool = require("./pool");

// Parent Class
class DatabaseOps {
    tableName;
    pool;

    constructor(tableName, pool) {
        this.tableName = tableName;
        this.pool = pool;
    }

    constructQuery(
        operationType,
        fields = {},
        finder = null,
        current_page = 1,
        current_search = ""
    ) {
        let sql = "";
        const valueArr = Object.values(fields);

        switch (operationType) {
            case "INSERT":
                const columns = Object.keys(fields).join(", ");
                const placeholders = new Array(valueArr.length)
                    .fill("?")
                    .join(", ");
                sql = `INSERT INTO ${this.tableName}(${columns}) VALUES(${placeholders})`;
                break;
            case "SELECT":
                const whereClause = Object.keys(fields)
                    .map((field) => `${field}=?`)
                    .join(" AND ");
                sql = `SELECT * FROM ${this.tableName} WHERE ${whereClause}`;
                break;
            case `SELECTALL`:
                const limit = 10;
                const offset = (current_page - 1) * limit;
                const search = current_search
                    ? `WHERE title LIKE '%${current_search}%'`
                    : "";
                sql = `SELECT * FROM ${this.tableName} ${search} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`;
                break;
            case `SELECTCOUNT`:
                const likeClause = `WHERE title LIKE '${current_search}'`;
                sql = current_search
                    ? `SELECT COUNT(*) as total FROM ${this.tableName} ${likeClause}`
                    : `SELECT COUNT(*) as total FROM ${this.tableName}`;
                break;
            case "UPDATEUSER":
                const setClause = Object.keys(fields)
                    .map((field) => `${field}=?`)
                    .join(", ");
                const where = `user_id='${fields.user_id}'`;
                sql = `UPDATE ${this.tableName} SET ${setClause} WHERE ${where}`;
                break;
            case "UPDATEBOARD":
                const updateClause = Object.keys(fields)
                    .map((field) => `${field}=?`)
                    .join(", ");
                const condition = `id='${finder}'`;
                sql = `UPDATE ${this.tableName} SET ${updateClause} WHERE ${condition}`;
                break;
            case "DELETE":
                const deleteClause = Object.keys(fields)
                    .map((field) => `${field}=?`)
                    .join(" AND ");
                sql = `DELETE FROM ${this.tableName} WHERE ${deleteClause}`;
                break;
        }

        return { sql, valueArr };
    }

    async executeQuery(sql, valueArr = []) {
        try {
            const result = await this.pool.query(sql, valueArr);
            return result;
        } catch (e) {
            throw new Error("Database Operations Error: " + e.message);
        }
    }
}

// Polymorphism
class CreateData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery("INSERT", fields);
        const [{ affectedRows }] = await this.executeQuery(sql, valueArr);
        return !!affectedRows;
    }
}

class SearchData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery("SELECT", fields);
        const [[result]] = await this.executeQuery(sql, valueArr);
        return result;
    }
}

class SearchAllData extends DatabaseOps {
    async execute(current_page, current_search = "") {
        const { sql } = this.constructQuery(
            "SELECTALL",
            {},
            null,
            current_page,
            current_search
        );
        const [result] = await this.executeQuery(sql);
        return result;
    }
}

class CountAllData extends DatabaseOps {
    async execute(current_search) {
        const { sql } = this.constructQuery(
            "SELECTCOUNT",
            {},
            null,
            1,
            current_search
        );
        const [[{ total }]] = await this.executeQuery(sql);
        return total;
    }
}

class UpdateUserData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery("UPDATEUSER", fields);
        const [{ changedRows }] = await this.executeQuery(sql, valueArr);
        return !!changedRows;
    }
}

class UpdateBoardData extends DatabaseOps {
    async execute(fields, finder) {
        const { sql, valueArr } = this.constructQuery(
            "UPDATEBOARD",
            fields,
            finder
        );
        const [{ changedRows }] = await this.executeQuery(sql, valueArr);
        return !!changedRows;
    }
}

class DeleteData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery("DELETE", fields);
        const [{ affectedRows }] = await this.executeQuery(sql, valueArr);
        return !!affectedRows;
    }
}

// Dependency Injection
exports.createAccount = new CreateData("accounts", pool);
exports.searchAccount = new SearchData("accounts", pool);
exports.updateAccount = new UpdateUserData("accounts", pool);
exports.deleteAccount = new DeleteData("accounts", pool);

exports.createBoard = new CreateData("boards", pool);
exports.listBoard = new SearchAllData("boards", pool);
exports.searchBoard = new SearchData("boards", pool);
exports.updateBoard = new UpdateBoardData("boards", pool);
exports.deleteBoard = new DeleteData("boards", pool);
exports.countBoardData = new CountAllData("boards", pool);

exports.createNotice = new CreateData("notice", pool);
exports.listNotice = new SearchAllData("notice", pool);
exports.searchNotice = new SearchData("notice", pool);
exports.updateNotice = new UpdateBoardData("notice", pool);
exports.deleteNotice = new DeleteData("notice", pool);
exports.countNoticeData = new CountAllData("notice", pool);
