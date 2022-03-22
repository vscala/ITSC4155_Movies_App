const express = require('express');
const controller = require('../controllers/showtimeController');

const router = express.Router();

// GET /connections: send all connections to the user

router.get('/', controller.index);

// GET /connections/new: send html form for creating a new story

router.get('/new', controller.new);

// POST /connections: send the created story

router.post('/', controller.create);

// GET /connections/:id: send details of a story

router.get('/:id', controller.show);

// GET /connections/:id/edit: send the html form for editing an existing story
router.get('/:id/edit', controller.edit);

// PUT /connections/:id: update the edited story
router.put('/:id', controller.update);

// DELETE /connections/:id: delete the story with the passed in id
router.delete('/:id', controller.delete);


module.exports = router;

