const express = require('express');
const EssayController = require('../controllers/Essay');

const router = express.Router();

router
  .route('/')
  .get(EssayController.readEssays)
  .post(EssayController.createEssay);

router
  .route('/:id')
  .get(EssayController.readEssayById)
  .put(EssayController.updateEssay)
  .delete(EssayController.deleteEssay);

module.exports = router;
