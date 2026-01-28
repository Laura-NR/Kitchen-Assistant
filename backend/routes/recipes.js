const express = require('express');
const { RecipeController } = require('../controllers/RecipeController.js');
const { verifyToken } = require('../middleware/auth-middleware.js');
const multer = require('multer');

const upload = multer({ dest: 'public/assets/' }); 

const router = express.Router();
const recipeController = new RecipeController();

router.get('/', verifyToken, (req, res) => recipeController.listAll(req, res));
router.post('/', verifyToken, upload.single('picture'), (req, res) => recipeController.create(req, res));
router.delete('/:id', verifyToken, (req, res) => recipeController.destroy(req, res));

module.exports = router;