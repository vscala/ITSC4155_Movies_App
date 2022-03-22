const express = require('express');
const controller = require('../controllers/mainController');

const mainRouter = express.Router();

mainRouter.get('/', controller.index);

module.exports = mainRouter;

