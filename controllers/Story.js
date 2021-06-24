const Story = require('../models/contents/Story')

exports.readStories = async (req, res) => {
    try {
        const stories = await Story.read()
        res.json({ stories })
    } catch (e) {
        res.json({ e })
    }
}

exports.readStoryById = async (req, res) => {
    const { id } = req.params
    try {
        const record = await Story.readById(id)
        res.json({ record })
    } catch (e) {
        res.json({ e })
    }
}

exports.createStory = async (req, res) => {
    try {
        const { story } = req.body
        const entry = await Story.create(story)
        res.json(entry)
    } catch (e) {
        res.json({ e })
    }
}

exports.updateStory = async (req, res) => {
    try {
        const { story } = req.body
        const { id } = req.params
        const updatedRecord = await Story.update(id, story)
        res.json({ updatedRecord })
    } catch (e) {
        res.json({ e })
    }
}

exports.deleteStory = async (req, res) => {
    try {
        const { id } = req.params
        const removed = await Story.delete(id)
        res.json(removed)
    } catch (e) {
        res.json({ e })
    }
}
