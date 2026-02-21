export class PlanningDAO {
    constructor(database) {
        this.db = database;
    }

    // --- Menus ---

    async createMenu(userId, startDate, endDate, householdSize) {
        const rows = await this.db.query(
            "INSERT INTO menus (user_id, start_date, end_date, household_size) VALUES ($1, $2, $3, $4) RETURNING id",
            [userId, startDate, endDate, householdSize]
        );
        return rows[0].id;
    }

    async addMenuItem(menuId, recipeId, day, type) {
        const rows = await this.db.query(
            "INSERT INTO menu_items (menu_id, recipe_id, day_of_week, meal_type) VALUES ($1, $2, $3, $4) RETURNING id",
            [menuId, recipeId, day, type]
        );
        return rows[0].id;
    }

    async deleteMenuItem(itemId) {
        await this.db.query("DELETE FROM menu_items WHERE id = $1", [itemId]);
    }

    async getMenu(menuId) {
        const menuRows = await this.db.query("SELECT * FROM menus WHERE id = $1", [menuId]);
        if (menuRows.length === 0) return null;

        const menu = menuRows[0];
        const items = await this.db.query(`
      SELECT mi.*, r.title as recipe_title, r.image as recipe_image
      FROM menu_items mi
      JOIN recipes r ON mi.recipe_id = r.id
      WHERE mi.menu_id = $1
      ORDER BY mi.day_of_week, mi.meal_type
    `, [menuId]);

        menu.items = items;
        return menu;
    }

    async getUserMenus(userId) {
        return this.db.query("SELECT * FROM menus WHERE user_id = $1 ORDER BY start_date DESC", [userId]);
    }

    // --- Shopping Lists ---

    async createShoppingList(userId, status = 'active') {
        const rows = await this.db.query(
            "INSERT INTO shopping_lists (user_id, status) VALUES ($1, $2) RETURNING id",
            [userId, status]
        );
        return rows[0].id;
    }

    async addShoppingListItem(listId, ingredientId, quantity, unit) {
        const rows = await this.db.query(
            "INSERT INTO shopping_list_items (list_id, ingredient_id, quantity, unit) VALUES ($1, $2, $3, $4) RETURNING id",
            [listId, ingredientId, quantity, unit]
        );
        return rows[0].id;
    }

    async getShoppingList(listId) {
        const listRows = await this.db.query("SELECT * FROM shopping_lists WHERE id = $1", [listId]);
        if (listRows.length === 0) return null;

        const list = listRows[0];
        const items = await this.db.query(`
      SELECT sli.*, i.name as ingredient_name, i.category
      FROM shopping_list_items sli
      JOIN ingredients i ON sli.ingredient_id = i.id
      WHERE sli.list_id = $1
    `, [listId]);

        list.items = items;
        return list;
    }

    async updateShoppingListItem(itemId, checked) {
        await this.db.query(
            "UPDATE shopping_list_items SET checked = $1 WHERE id = $2",
            [checked, itemId]
        );
    }
}
