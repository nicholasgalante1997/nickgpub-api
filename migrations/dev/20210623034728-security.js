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
  await db.createTable('security_questions', {
    id: {
      type: 'string',
      primaryKey: true,
    },
    adminId: {
      type: 'string',
      notNull: true,
    },
    prompt: {
      type: 'string',
      notNull: true,
    },
  });
  await db.addForeignKey('security_questions', 'admin', 'security_question_admin_id', { adminId: 'id' }, {});
  callback();
};

exports.down = async function down(db, callback) {
  await db.dropForeignKey('security_questions', 'security_question_admin_id', { dropIndex: true });
  await db.dropTable('security_questions');
  callback();
};

exports._meta = {
  version: 1,
};
