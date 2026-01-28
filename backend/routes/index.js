const express = require('express');
const recipesRouter = require('./recipes.js');
const usersRouter = require('./users.js');
const categoryRouter = require('./categories.js');

const router = express.Router();

router.use('/recipes', recipesRouter);
router.use('/auth', usersRouter);
router.use('/categories', categoryRouter);

module.exports = router;