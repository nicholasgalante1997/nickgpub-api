const mysql = require('mysql');

class DatabaseManager {
    _config

    constructor(config){
        this._config = config;
    }

    connect = () => mysql.createConnection(this._config);

    query = async (query, values = null) => {
        const connection = this.connect();
        if (values) {
            const queryResult = await new Promise((resolve, reject) => {
                connection.query(query, values, (err, results, fields) => {
                    if (err) { console.log(err.message); connection.end(); throw new Error(err.message); }
                    resolve(results);
                })
            })
            connection.end();
            return queryResult;
        } 
        
        const queryResult = await new Promise((resolve, reject) => {
            connection.query(query, (err, results, fields) => {
                if (err) { console.log(err.message); connection.end(); throw new Error(err.message); }
                resolve(results);
            })
        })
        connection.end();
        return queryResult;
    } 
}

module.exports = DatabaseManager;