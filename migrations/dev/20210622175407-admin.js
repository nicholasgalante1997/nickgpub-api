var dbm;
var type;
var seed;

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
  await db.createTable('admin', {
    id: {
      type: 'string',
      primaryKey: true,
      notNull: true,
    },
    username: {
      type: 'string',
      unique: true,
    },
  });
  callback();
};

exports.down = async function down(db, callback) {
  await db.dropTable('admin');
  callback();
};

exports._meta = {
  "version": 1
};
