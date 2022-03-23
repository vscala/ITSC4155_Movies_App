const express = require('express');
const controller = require('../controllers/mainController');

const mainRouter = express.Router();

mainRouter.get('/', controller.index);
/*mainRouter.get('/new', controller.new);*/

module.exports = mainRouter;

