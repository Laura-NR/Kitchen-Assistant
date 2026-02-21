import { Database } from '../config/database.js';
import 'dotenv/config';

export class CategoryController {
    constructor() {
        this.db = new Database();
    }

    async listAll(req, res) {
        try {
            const userId = req.userId;
            const results = await this.db.query('SELECT * FROM categories WHERE "user" = $1 OR "user" IS NULL', [userId]);
            res.json(results);
        } catch (error) {
            res.status(500).json({ message: 'Error listing categories: ' + error.message });
        }
    }

    async create(req, res) {
        const { name } = req.body;
        const userId = req.userId;
        try {
            const rows = await this.db.query(
                'INSERT INTO categories (name, "user") VALUES ($1, $2) RETURNING *',
                [name, userId]
            );

            if (rows.length > 0) {
                res.status(201).json(rows[0]);
            } else {
                res.status(500).json({ message: 'Error retrieving the newly created category.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error creating category: ' + error.message });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const userId = req.userId;

        try {
            const rows = await this.db.query(
                'UPDATE categories SET name = $1 WHERE id = $2 AND "user" = $3 RETURNING *',
                [name, id, userId]
            );

            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: 'Category not found or you do not have permission to edit it.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating category: ' + error.message });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        const userId = req.userId;

        try {
            await this.db.query(
                'DELETE FROM categories WHERE id = $1 AND "user" = $2',
                [id, userId]
            );

            res.json({ message: 'Category deleted successfully.' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category: ' + error.message });
        }
    }
}
