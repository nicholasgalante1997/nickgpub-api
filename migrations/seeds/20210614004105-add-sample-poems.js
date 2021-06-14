let dbm;
let type;
let seed;

const initPoems = [
  {
    id: 'sample-1',
    collectionId: 'NAT-1',
    title: 'After Hours, Denver',
    description: 'sample desc',
    content: 'sample content',
    chronology: JSON.stringify({ sample: true }),
    visits: 0,
  },
  {
    id: 'sample-2',
    collectionId: 'HIST-1',
    title: 'After Hours, Denver 2',
    description: 'sample desc',
    content: 'sample content',
    chronology: JSON.stringify({ sample: true }),
    visits: 0,
  },
];

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
  initPoems.forEach((poem) => {
    (async () => {
      await db.insert('poems',
        ['id', 'collectionId', 'title', 'description', 'content', 'chronology', 'visits'],
        [
          poem.id,
          poem.collectionId,
          poem.title,
          poem.description,
          poem.content,
          poem.chronology,
          poem.visits,
        ]);
    })();
  });
  callback();
};

exports.down = async function down(db, callback) {
  await db.runSql('TRUNCATE poems');
  callback();
};

exports._meta = {
  version: 1,
};
