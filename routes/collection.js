const express = require('express');
const CollectionController = require('../controllers/Collection');

const router = express.Router();

router.route('/')
  .get(CollectionController.readCollections)
  .post(CollectionController.createCollection);

router.route('/:id')
  .get(CollectionController.readCollectionById)
  .put(CollectionController.updateCollection)
  .delete(CollectionController.deleteCollection);

module.exports = router;
