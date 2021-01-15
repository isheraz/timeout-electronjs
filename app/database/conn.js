const { createRxDatabase, addRxPlugin } = require('rxdb');
const leveldown = require('leveldown');
const activitySchema = require('./schemas/activity.js');

addRxPlugin(require('pouchdb-adapter-leveldb'));

const initDB = async () => {
  try {
    const db = await createRxDatabase({
      name: 'timeoutdb',
      adapter: leveldown,
    });
    await db.addCollections({
      activity: {
        schema: activitySchema,
      },
    });
    return db;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { initDB };
