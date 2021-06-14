const db = require('../database/DBManager');
const Model = require('./Model');

class Content extends Model {

    _eslint_class

    constructor(table) {
        super(table);
        
    }
    
    readByCollectionId = async (collectionId) => {
        try {
          const records = await db.query(`select * from ${this._table} where collectionId = ? `, [collectionId]);
          return records;
        } catch(e) {
            throw new Error(e.message);
        }
        
    }
}

module.exports = Content;