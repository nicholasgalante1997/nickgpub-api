let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function setup(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function up(db, callback) {
  await db.addColumn('poems', 'contentType', { type: 'string' });
  await db.addColumn('essays', 'contentType', { type: 'string' });
  await db.addColumn('stories', 'contentType', { type: 'string' });
  callback();
};

exports.down = async function down(db, callback) {
  await db.removeColumn('poems', 'contentType');
  await db.removeColumn('essays', 'contentType');
  await db.removeColumn('stories', 'contentType');
  callback();
};

exports._meta = {
  version: 1,
};
