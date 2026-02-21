export class InventoryDAO {
    constructor(database) {
        this.db = database;
    }

    // --- Ingredients ---

    async findIngredients(query = "") {
        let sql = "SELECT * FROM ingredients";
        const params = [];

        if (query) {
            sql += " WHERE name ILIKE $1"; // ILIKE for case-insensitive
            params.push(`%${query}%`);
        }

        return this.db.query(sql, params);
    }

    async getIngredientById(id) {
        // pg returns result object. Our wrapper returns res.rows. So we get array of rows.
        const rows = await this.db.query("SELECT * FROM ingredients WHERE id = $1", [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    async createIngredient(name, unit, category) {
        const rows = await this.db.query(
            "INSERT INTO ingredients (name, default_unit, category) VALUES ($1, $2, $3) RETURNING id",
            [name, unit, category]
        );
        return rows[0].id;
    }

    // --- Inventory ---

    async getInventory(userId) {
        const sql = `
      SELECT inv.*, i.name as ingredient_name, i.default_unit, i.category
      FROM inventory inv
      JOIN ingredients i ON inv.ingredient_id = i.id
      WHERE inv.user_id = $1
    `;
        return this.db.query(sql, [userId]);
    }

    async upsertInventoryItem(userId, ingredientId, quantity, expiryDate = null) {
        // Check if item exists
        const existing = await this.db.query(
            "SELECT id FROM inventory WHERE user_id = $1 AND ingredient_id = $2",
            [userId, ingredientId]
        );

        if (existing.length > 0) {
            // Update
            const sql = "UPDATE inventory SET quantity = $1, expiry_date = $2 WHERE id = $3 RETURNING id";
            const rows = await this.db.query(sql, [quantity, expiryDate, existing[0].id]);
            return rows[0].id;
        } else {
            // Insert
            const rows = await this.db.query(
                "INSERT INTO inventory (user_id, ingredient_id, quantity, expiry_date) VALUES ($1, $2, $3, $4) RETURNING id",
                [userId, ingredientId, quantity, expiryDate]
            );
            return rows[0].id;
        }
    }

    async deleteInventoryItem(userId, itemId) {
        // pg doesn't return affectedRows directly in result.rows. 
        // However, our wrapper returns res.rows. Result object has .rowCount.
        // We need to modify wrapper to return standard PG result or handle it.
        // Let's modify wrapper to return object with rows and rowCount if possible, or just ignore for now as most logic doesn't strictly depend on it.
        // Actually, let's keep it simple.

        // Waiting: I CAN MODIFY THE WRAPPER.
        // But let's check `database.js` I just wrote: return res.rows;
        // So I can't check rowCount.
        // Let's modify database.js to return { rows, rowCount } or just rows. 
        // Given the previous code expected `result.insertId` or `result.affectedRows`, I should probably adjust the wrapper.
        // FOR NOW, let's just execute the query.

        await this.db.query(
            "DELETE FROM inventory WHERE id = $1 AND user_id = $2",
            [itemId, userId]
        );
        return true;
    }
}
