const Collection = require('../models/collections/Collection');

exports.readCollections = async (req, res) => {
  const collections = await Collection.read();
  res.json({ collections });
};

exports.readCollectionById = async (req, res) => {
  const { id } = req.params;
  const record = await Collection.readById(id);
  res.json({ record });
};

exports.createCollection = async (req, res) => {
  const { collection } = req.body;
  const entry = await Collection.create(collection);
  res.json(entry);
};

exports.updateCollection = async (req, res) => {
  const { collection } = req.body;
  const { id } = req.params;
  const updatedRecord = await Collection.update(id, collection);
  res.json({ updatedRecord });
};

exports.deleteCollection = async (req, res) => {
  const { id } = req.params;
  const removed = await Collection.delete(id);
  res.json(removed);
};
