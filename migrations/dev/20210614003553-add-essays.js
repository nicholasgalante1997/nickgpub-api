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
  await db.createTable('essays', {
    id: {
      type: 'string',
      primaryKey: true,
      notNull: true,
    },
    collectionId: {
      type: 'string',
      notNull: true,
    },
    title: {
      type: 'string',
      unique: true,
      notNull: true,
    },
    description: {
      type: 'string',
      notNull: true,
    },
    content: {
      type: 'text',
      notNull: true,
    },
    createTime: {
      type: 'datetime',
      notNull: true,
      defaultValue: 'CURRENT_TIMESTAMP',
    },
    updateTime: {
      type: 'datetime',
      notNull: true,
      defaultValue: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    },
    active: {
      type: 'boolean',
      notNull: true,
      defaultValue: '1',
    },
    visits: 'int',
    chronology: 'string',
  });

  await db.addForeignKey('essays', 'collections', 'essay_collection_id', { collectionId: 'id' }, {});
  callback();
};

exports.down = async function down(db, callback) {
  await db.removeForeignKey('essays', 'essay_collection_id', { dropIndex: true });
  await db.dropTable('essays');
  callback();
};

exports._meta = {
  version: 1,
};
