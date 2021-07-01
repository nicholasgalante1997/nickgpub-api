const db = require('./DBManager');

exports.retrieveTableInfo = async (req, res) => {
  const { table } = req.params;
  const log = await db.query(`DESCRIBE ${table}`);
  res.json({ log });
};
