const { v4: uuidv4 } = require('uuid')
const bcryptjs = require('bcryptjs')
const db = require('../../core/database/DBManager')
const Model = require('../../core/model/Model')

class SecurityResponse extends Model {
    createSA = async ({ rawSAObject }) => {
        const { answer, questionId } = rawSAObject
        const hashedResponse = await bcryptjs.hash(answer, 3)
        const id = uuidv4()
        const data = { id, questionId, hashedResponse }
        try {
            const cols = await db.query(`DESCRIBE ${this._table}`)
            const valid = Model.validate(cols, data)
            if (!valid) {
                return {
                    error: 'Post content was incompatible with db table fields',
                }
            }
            const entry = await db.query(
                `insert into ${this._table} set ?`,
                data
            )
            return { entry }
        } catch (e) {
            throw new Error(e.message)
        }
    }

    getSAByQuestionId = async (questionId) => {
        try {
            const answer = await db.query(
                `select * from ${this._table} where questionId = ? `,
                [questionId]
            )
            return answer
        } catch (e) {
            throw new Error(e.message)
        }
    }

    compareResponses = async (mockAnswerObject) => {
        const { answer, id } = mockAnswerObject
        try {
            const realAnswerArr = await db.query(
                `select * from security_answers where id = ?`,
                [id]
            )
            if (realAnswerArr.length === 0) {
                throw new Error('NO RECORD FOUND WITH THIS ID')
            }
            const { hashedResponse } = realAnswerArr[0]
            const isValidAnswer = await bcryptjs.compare(answer, hashedResponse)
            return isValidAnswer
        } catch (e) {
            throw new Error(e.message)
        }
    }
}

module.exports = new SecurityResponse('security_answers')
