// Pool definition
const pool = require('./pool')

// Class
class DatabaseOps {
    tableName
    pool

    constructor(tableName, pool) {
        this.tableName = tableName;
        this.pool = pool
    }

    constructQuery(operationType, fields = {}) {
        let sql = '';
        const valueArr = Object.values(fields);

        switch (operationType) {
            case 'INSERT':
                const columns = Object.keys(fields).join(', ');
                const placeholders = new Array(valueArr.length).fill('?').join(', ');
                sql = `INSERT INTO ${this.tableName}(${columns}) VALUES(${placeholders})`;
                break;
            case 'SELECT':
                const whereClause = Object.keys(fields).map(field => `${field}=?`).join(' AND ');
                sql = `SELECT * FROM ${this.tableName} WHERE ${whereClause}`;
                break; // Search
            case `SELECTALL`:
                sql = `SELECT * FROM ${this.tableName}`;
                break;
            case 'UPDATEUSER':
                const setClause = Object.keys(fields).map(field => `${field}=?`).join(', ');
                console.log(fields);
                const where = `user_id='${fields.user_id}'`
                console.log(where);
                sql = `UPDATE ${this.tableName} SET ${setClause} WHERE ${where}`;
                break;
            case 'UPDATEBOARD':
                const updateClause = Object.keys(fields).map(field => `${field}=?`).join(', ');
                console.log(fields);
                const condition = `id='${fields.id}'`
                console.log(where);
                sql = `UPDATE ${this.tableName} SET ${updateClause} WHERE ${condition}`;
                break;
            case 'DELETE':
                const deleteClause = Object.keys(fields).map(field => `${field}=?`).join(' AND ');
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
            throw new Error('Database Operations Error: ' + e.message);
        }
    }
}

// Polymorphism
class CreateData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery('INSERT', fields);
        const [{ affectedRows }] = await this.executeQuery(sql, valueArr);
        return !!affectedRows;
    }
}

class SearchData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery('SELECT', fields);
        const [[result]] = await this.executeQuery(sql, valueArr);
        return result;
    }
}

class SearchAllData extends DatabaseOps {
    async execute() {
        const { sql } = this.constructQuery('SELECTALL');
        const [ result ] = await this.executeQuery(sql);
        return result;
    }
}

class UpdateUserData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery('UPDATEUSER', fields);
        const [{ changedRows }] = await this.executeQuery(sql, valueArr);
        return !!changedRows;
    }
}

class UpdateBoardData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery('UPDATEBOARD', fields);
        const [{ changedRows }] = await this.executeQuery(sql, valueArr);
        return !!changedRows;
    }
}

class DeleteData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery('DELETE', fields);
        const [{ affectedRows }] = await this.executeQuery(sql, valueArr);
        return !!affectedRows;
    }
}

// Dependency Injection
exports.createAccount = new CreateData('accounts', pool);
exports.searchAccount = new SearchData('accounts', pool);
exports.updateAccount = new UpdateUserData('accounts', pool);
exports.deleteAccount = new DeleteData('accounts', pool);

exports.createBoard = new CreateData('boards', pool);
exports.listBoard = new SearchAllData('boards', pool);
exports.searchBoard = new SearchData('boards', pool);
exports.updateBoard = new UpdateBoardData('boards', pool);
exports.deleteBoard = new DeleteData('boards', pool);

exports.createNotice = new CreateData('notice', pool);
exports.listNotice = new SearchAllData('notice', pool);
exports.searchNotice = new SearchData('notice', pool);
exports.updateNotice = new UpdateBoardData('notice', pool);
exports.deleteNotice = new DeleteData('notice', pool);

