const express = require('express')
const StoryController = require('../controllers/Story')

const router = express.Router()

router
    .route('/')
    .get(StoryController.readStories)
    .post(StoryController.createStory)

router
    .route('/:id')
    .get(StoryController.readStoryById)
    .put(StoryController.updateStory)
    .delete(StoryController.deleteStory)

module.exports = router
