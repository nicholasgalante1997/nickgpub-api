'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function up(db, callback) {
  await db.addColumn('collections', 'thumbnail', { type: 'string' });
  callback()
};

exports.down = async function down(db, callback) {
  await db.removeColumn('collections', 'thumbnail');
  callback()
};

exports._meta = {
  "version": 1
};
