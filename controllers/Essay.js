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

exports.createEssay = async (req, res) => {
  try {
    const { essay } = req.body;
    const entry = await Essay.create(essay);
    res.json(entry);
  } catch (e) {
    res.json({ e });
  }
};

exports.updateEssay = async (req, res) => {
  try {
    const { essay } = req.body;
    const { id } = req.params;
    const updatedRecord = await Essay.update(id, essay);
    res.json({ updatedRecord });
  } catch (e) {
    res.json({ e });
  }
};

exports.deleteEssay = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Essay.delete(id);
    res.json(removed);
  } catch (e) {
    res.json({ e });
  }
};
