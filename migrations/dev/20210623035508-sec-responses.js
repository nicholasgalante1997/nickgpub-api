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
  await db.createTable('security_answers', {
    id: {
      type: 'string',
      primaryKey: true,
    },
    questionId: {
      type: 'string',
      notNull: true,
    },
    hashedResponse: {
      type: 'string',
      notNull: true,
    },
  });
  await db.addForeignKey('security_answers', 'security_questions', 'security_answer_question_id', { questionId: 'id' }, {});
  callback();
};

exports.down = async function down(db, callback) {
  await db.dropForeignKey('security_answers', 'security_answers_question_id', { dropIndex: true });
  await db.dropTable('security_answers');
  callback();
};

exports._meta = {
  version: 1,
};
