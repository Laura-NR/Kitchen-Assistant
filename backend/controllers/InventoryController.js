export class InventoryController {
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }

    async getInventory(req, res, next) {
        try {
            const inventory = await this.inventoryService.getInventory(req.userId);
            res.json(inventory);
        } catch (error) {
            next(error);
        }
    }

    async addToInventory(req, res, next) {
        try {
            const result = await this.inventoryService.addToInventory(req.userId, req.body);
            res.status(201).json({ success: true, id: result });
        } catch (error) {
            next(error);
        }
    }

    async searchIngredients(req, res, next) {
        try {
            const results = await this.inventoryService.searchIngredients(req.query.q);
            res.json(results);
        } catch (error) {
            next(error);
        }
    }

    async remove(req, res, next) {
        try {
            await this.inventoryService.removeFromInventory(req.userId, req.params.id);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }
}
