const Model = require('../../core/model/Model')
const db = require('../../core/database/DBManager')

class Admin extends Model {
    readByUsername = async (username) => {
        const admin = await db.query(
            `select * from ${this._table} where username = ? `,
            [username]
        )
        return admin
    }
}

module.exports = new Admin('admin')
