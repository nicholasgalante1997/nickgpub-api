const { v4: uuidv4 } = require('uuid');
const Admin = require('../models/admin/Admin');

exports.createAdmin = async (req, res) => {
  try {
    const { admin } = req.body;
    const { username } = admin;
    const id = uuidv4();
    const entry = await Admin.create({ id, username });
    res.json(entry);
  } catch (e) {
    res.json({ e });
  }
};

exports.readAdminByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const admin = await Admin.readByUsername(username);
    res.json({ admin });
  } catch (e) {
    res.json({ e });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Admin.delete(id);
    res.json(result);
  } catch (e) {
    res.json({ e });
  }
};
