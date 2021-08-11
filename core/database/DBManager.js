const mysql = require('mysql')

class DatabaseManager {
    _config

    constructor(config) {
        this._config = config
    }

    connect = () => mysql.createConnection(this._config)

    query = async (query, values = null) => {
        const connection = this.connect()
        console.log(`connected as id ${connection.threadId}`)
        if (values) {
            const queryResult = await new Promise((resolve, reject) => {
                connection.query(query, values, (err, results, fields) => {
                    if (err) {
                        console.log(err.message)
                        connection.end()
                        throw new Error(err.message)
                    }
                    resolve(results)
                })
            })
            connection.end()
            return queryResult
        }

        const queryResult = await new Promise((resolve, reject) => {
            connection.query(query, (err, results, fields) => {
                if (err) {
                    console.log(err.message)
                    connection.end()
                    throw new Error(err.message)
                }
                resolve(results)
            })
        })
        connection.end()
        return queryResult
    }
}

const db = new DatabaseManager({
    host: process.env.HRKU_CLEARDB_HOST,
    user: process.env.HRKU_CLEARDB_USERNAME,
    password: process.env.HRKU_CLEARDB_PASSWORD,
    database: process.env.HRKU_CLEARDB_DATABASE,
})

module.exports = db
