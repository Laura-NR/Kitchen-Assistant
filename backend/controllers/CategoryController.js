const prisma = require('../config/prisma.js');

class CategoryController {
    async listAll(req, res) {
        try {
            const categories = await prisma.category.findMany({
                where: { userId: req.userId }
            });
            res.json(categories);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching categories' });
        }
    }

    async create(req, res) {
        const { name } = req.body;
        try {
            const newCategory = await prisma.category.create({
                data: {
                    name: name,
                    userId: req.userId
                }
            });
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error creating category' });
        }
    }
}

module.exports = { CategoryController };