const Essay = require('../models/contents/Essay');

exports.readEssays = async (req, res) => {
  try {
    const essays = await Essay.read();
    res.json({ essays });
  } catch (e) {
    res.json({ e });
  }
};

exports.readEssayById = async (req, res) => {
  const { id } = req.params;
  try {
    const record = await Essay.readById(id);
    res.json({ record });
  } catch (e) {
    res.json({ e });
  }
};

exports.readEssaysByCollection = async (req, res) => {
  const { collectionId } = req.params;
  try {
    const essays = await Essay.readByCollectionId(collectionId);
    res.json({ collectionId, essays });
  } catch (e) {
    res.json({ e });
  }
};

// exports.create =
