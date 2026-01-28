const express = require('express');
const { CategoryController } = require('../controllers/CategoryController.js');
const { verifyToken } = require('../middleware/auth-middleware.js');

const router = express.Router();
const controller = new CategoryController();

router.get('/', verifyToken, (req, res) => controller.listAll(req, res));
router.post('/', verifyToken, (req, res) => controller.create(req, res));

module.exports = router;