const db = require('../database/DBManager');

class Model {
    _table

    constructor(table){
        this._table = table;
    }

    static validate = (tableData, postData) => {
      let flag = true;
      const requiredFields = [];
      tableData.forEach(column => {
          if (column['Null'] === 'NO' && column['Default'] === null) {
              requiredFields.push(column);
          }
      })
      requiredFields.forEach(column => {
        const attribute = column['Field'];
        if (!postData[attribute]){
          flag = false;
        }
      });
      return flag;
    }

    read = async () => {
        try {
            const results =  await db.query(`select * from ${this._table}`);
            return results;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    readById = async (id) => {
        try {
            const result = await db.query(`select * from ${this._table} where id = ?`, [id]);
            return result;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    create = async (data) => {
        // const tableData = await Model.identify()
        const cols = await db.query(`DESCRIBE ${this._table}`);
        const valid = Model.validate(cols, data);
        return valid;
        // try {
        //     // TODO: test if validation works
        //     // TODO: test if inserting this way works
        //     if (Model.validate(tableData, data)) {
        //         const record = await db.query(`insert into ${this._table} set ?`, data);
        //         return record;
        //     } else {
        //       throw new Error('Data receieved was invalid or did not match the table columns');
        //     }
            
        // } catch (e) {
        //     throw new Error(e.message);
        // }
    }
}

module.exports = Model;