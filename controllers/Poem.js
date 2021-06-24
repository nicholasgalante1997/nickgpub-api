const Poem = require('../models/contents/Poem')

exports.readPoems = async (req, res) => {
    try {
        const poems = await Poem.read()
        res.json({ poems })
    } catch (e) {
        res.json({ e })
    }
}

exports.readPoemById = async (req, res) => {
    const { id } = req.params
    try {
        const record = await Poem.readById(id)
        res.json({ record })
    } catch (e) {
        res.json({ e })
    }
}

exports.createPoem = async (req, res) => {
    try {
        const { poem } = req.body
        const entry = await Poem.create(poem)
        res.json(entry)
    } catch (e) {
        res.json({ e })
    }
}

exports.updatePoem = async (req, res) => {
    try {
        const { poem } = req.body
        const { id } = req.params
        const updatedRecord = await Poem.update(id, poem)
        res.json({ updatedRecord })
    } catch (e) {
        res.json({ e })
    }
}

exports.deleteStory = async (req, res) => {
    try {
        const { id } = req.params
        const removed = await Poem.delete(id)
        res.json(removed)
    } catch (e) {
        res.json({ e })
    }
}
