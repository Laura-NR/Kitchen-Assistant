export class InventoryService {
    constructor(inventoryDAO) {
        this.inventoryDAO = inventoryDAO;
    }

    async getInventory(userId) {
        return this.inventoryDAO.getInventory(userId);
    }

    async addToInventory(userId, ingredientData) {
        // Check if ingredient exists or needs creation
        let ingredientId = ingredientData.id;

        if (!ingredientId && ingredientData.name) {
            // Try to find existing by name
            const existing = await this.inventoryDAO.findIngredients(ingredientData.name);
            if (existing.length > 0) {
                ingredientId = existing[0].id; // taking first match
            } else {
                // Create new ingredient
                ingredientId = await this.inventoryDAO.createIngredient(
                    ingredientData.name,
                    ingredientData.unit || 'units',
                    ingredientData.category || 'misc'
                );
            }
        }

        if (!ingredientId) {
            throw new Error("Invalid ingredient data");
        }

        return this.inventoryDAO.upsertInventoryItem(
            userId,
            ingredientId,
            ingredientData.quantity,
            ingredientData.expiryDate
        );
    }

    async searchIngredients(query) {
        return this.inventoryDAO.findIngredients(query);
    }

    async removeFromInventory(userId, itemId) {
        return this.inventoryDAO.deleteInventoryItem(userId, itemId);
    }
}
