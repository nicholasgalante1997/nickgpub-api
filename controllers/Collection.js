const Collection = require('../models/collections/Collection');

exports.readCollections = async (req, res) => {
  try {
    const collections = await Collection.read();
    res.json({ collections });
  } catch (e) {
    res.json({ e });
  }
};

exports.readCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await Collection.readById(id);
    res.json({ record });
  } catch (e) {
    res.json({ e });
  }
};

exports.createCollection = async (req, res) => {
  try {
    const { collection } = req.body;
    const entry = await Collection.create(collection);
    res.json(entry);
  } catch (e) {
    res.json({ e });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { collection } = req.body;
    const { id } = req.params;
    const updatedRecord = await Collection.update(id, collection);
    res.json({ updatedRecord });
  } catch (e) {
    res.json({ e });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Collection.delete(id);
    res.json(removed);
  } catch (e) {
    res.json({ e });
  }
};
