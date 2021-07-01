const express = require('express');
const PoemController = require('../controllers/Poem');

const router = express.Router();

router.route('/').get(PoemController.readPoems).post(PoemController.createPoem);

router
  .route('/:id')
  .get(PoemController.readPoemById)
  .put(PoemController.updatePoem)
  .delete(PoemController.deleteStory);

module.exports = router;
