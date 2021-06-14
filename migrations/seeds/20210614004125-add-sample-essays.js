let dbm;
let type;
let seed;

const initEssays = [
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
  initEssays.forEach((essay) => {
    (async () => {
      await db.insert('essays',
        ['id', 'collectionId', 'title', 'description', 'content', 'chronology', 'visits'],
        [
          essay.id,
          essay.collectionId,
          essay.title,
          essay.description,
          essay.content,
          essay.chronology,
          essay.visits,
        ]);
    })();
  });
  callback();
};

exports.down = async function down(db, callback) {
  await db.runSql('TRUNCATE essays;');
  callback();
};

exports._meta = {
  version: 1,
};
