let dbm;
let type;
let seed;

const initCollections = [
  {
    id: 'ABS-1',
    label: 'Absurd Stories That Could Never Be True For Another Year Or So',
    description: 'All of the things that make life and death worth doing so stylishly.',
    chronology: JSON.stringify({ embarkment: 'no logs' }),
    visits: 0,
  },
  {
    id: 'NAT-1',
    label: 'Summits and Reservoirs',
    description: 'See as much as you can while seeing nothing at all.',
    chronology: JSON.stringify({ embarkment: 'no logs' }),
    visits: 0,
  },
  {
    id: 'HIST-1',
    label: 'Shadow Boxes',
    description: 'False vignettes for false individuals that happened to be alive at one point on earth.',
    chronology: JSON.stringify({ embarkment: 'no logs' }),
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
  initCollections.forEach((collection) => {
    (async () => {
      await db.insert('collections',
        ['id', 'label', 'description', 'chronology', 'visits'],
        [
          collection.id,
          collection.label,
          collection.description,
          collection.chronology,
          collection.visits,
        ]);
    })();
  });
  callback();
};

exports.down = async function down(db, callback) {
  await db.runSql('TRUNCATE collections');
  callback();
};

exports._meta = {
  version: 1,
};
