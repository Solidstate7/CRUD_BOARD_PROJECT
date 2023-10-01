const pool = require('./poolPromise')

class DatabaseOps {
    tableName
    pool

    constructor(tableName, pool) {
        this.tableName = tableName;
        this.pool = pool
    }

    constructQuery(operationType, fields) {
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
            case 'UPDATE':
                const setClause = Object.keys(fields).map(field => `${field}=?`).join(', ');
                sql = `UPDATE ${this.tableName} SET ${setClause}`;
                break;
            case 'DELETE':
                const deleteClause = Object.keys(fields).map(field => `${field}=?`).join(' AND ');
                sql = `DELETE FROM ${this.tableName} WHERE ${deleteClause}`;
                break;
            
        }

        return { sql, valueArr };
    }

    async executeQuery(sql, valueArr) {
        try {
            const result = await this.pool.query(sql, valueArr);
            return result;
        } catch (e) {
            throw new Error('Database Operations Error: ' + e.message);
        }
    }
}

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

class UpdateData extends DatabaseOps {
    async execute(fields) {
        const { sql, valueArr } = this.constructQuery('UPDATE', fields);
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

exports.createAccount = new CreateData('accounts', pool);
exports.searchAccount = new SearchData('accounts', pool);
exports.updateAccount = new UpdateData('accounts', pool);
exports.deleteAccount = new DeleteData('accounts', pool);
