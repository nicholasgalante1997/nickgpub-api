const db = require('../../core/database/DBManager')
const Model = require('../../core/model/Model')

class SecurityQuestions extends Model {
    readByAdminId = async (adminID) => {
        const questions = await db.query(
            `select * from ${this._table} where adminId = ? `,
            [adminID]
        )
        return { questions }
    }
}

module.exports = new SecurityQuestions('security_questions')
