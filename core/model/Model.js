const db = require('../database/DBManager')

class Model {
    _table

    constructor(table) {
        this._table = table
    }

    static validate = (tableData, postData) => {
        let flag = true
        const requiredFields = []
        tableData.forEach((column) => {
            if (column.Null === 'NO' && column.Default === null) {
                requiredFields.push(column)
            }
        })
        requiredFields.forEach((column) => {
            const attribute = column.Field
            if (!postData[attribute]) {
                flag = false
            }
        })
        return flag
    }

    read = async () => {
        try {
            const results = await db.query(`select * from ${this._table}`)
            return results
        } catch (e) {
            throw new Error(e.message)
        }
    }

    readById = async (id) => {
        try {
            const result = await db.query(
                `select * from ${this._table} where id = ?`,
                [id]
            )
            return result
        } catch (e) {
            throw new Error(e.message)
        }
    }

    create = async (data) => {
        const cols = await db.query(`DESCRIBE ${this._table}`)
        const valid = Model.validate(cols, data)
        if (!valid) {
            return {
                error: 'Post content was incompatible with db table fields',
            }
        }
        try {
            const response = await db.query(
                `insert into ${this._table} set ?`,
                data
            )
            if (response.affectedRows === 1) {
                return { status: 200, msg: 'Post Success', id: data.id }
            }
        } catch (e) {
            throw new Error(e.message)
        }
    }

    update = async (id, data) => {
        const cols = await db.query(`DESCRIBE ${this._table}`)
        const valid = Model.validate(cols, data)
        if (!valid) {
            return {
                error: 'Post content was incompatible with db table fields',
            }
        }
        try {
            const isolate = await db.query(
                `select * from ${this._table} where id = ?`,
                [id]
            )
            if (!isolate) {
                return { error: 'No Record Found With That ID' }
            }
            const updated = await db.query(
                `update ${this._table} set ? where id = ?`,
                [data, id]
            )
            return updated
        } catch (e) {
            throw new Error(e.message)
        }
    }

    delete = async (id) => {
        const isolate = await db.query(
            `select * from ${this._table} where id = ?`,
            [id]
        )
        if (!isolate) {
            return { error: 'No Record Found With That ID' }
        }
        const res = await db.query(`delete from ${this._table} where id = ?`, [
            id,
        ])
        return res
    }
}

module.exports = Model
