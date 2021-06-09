'use strict';

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
  await db.createTable('collections', {
    id: {
      type: 'string',
      primaryKey: true,
      notNull: true,
    },
    label: {
      type: 'string',
      notNull: true,
      unique: true,
    },
    description: {
      type: 'string',
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
  callback();
};

exports.down = async function down(db, callback) {
  await db.dropTable('collections');
  callback();
};

exports._meta = {
  "version": 1
};
