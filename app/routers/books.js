var express = require('express');
var router = express.Router();

var bookController = require('../controllers/books');

router.get('/', bookController.getAll);
router.post('/', bookController.create);

router.get('/:bookId', bookController.getBook);
router.put('/:bookId', bookController.update);
router.delete('/:bookId', bookController.remove);

module.exports = router;