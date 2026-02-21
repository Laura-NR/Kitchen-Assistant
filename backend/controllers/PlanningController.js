export class PlanningController {
    constructor(planningService) {
        this.planningService = planningService;
    }

    async createMenu(req, res, next) {
        try {
            const menu = await this.planningService.createMenu(req.userId, req.body);
            res.status(201).json(menu);
        } catch (error) {
            next(error);
        }
    }

    async addMenuItem(req, res, next) {
        try {
            const { recipeId, day, type } = req.body;
            const itemId = await this.planningService.addMenuItem(req.params.menuId, recipeId, day, type);
            res.status(201).json({ id: itemId });
        } catch (error) {
            next(error);
        }
    }

    async removeMenuItem(req, res, next) {
        try {
            await this.planningService.removeMenuItem(req.params.itemId);
            res.status(200).json({ message: "Item removed" });
        } catch (error) {
            next(error);
        }
    }

    async getMenu(req, res, next) {
        try {
            const menu = await this.planningService.getMenu(req.params.id);
            if (!menu) return res.status(404).json({ error: "Menu not found" });
            res.json(menu);
        } catch (error) {
            next(error);
        }
    }

    async listMenus(req, res, next) {
        try {
            const menus = await this.planningService.getUserMenus(req.userId);
            res.json(menus);
        } catch (error) {
            next(error);
        }
    }

    async generateShoppingList(req, res, next) {
        try {
            const list = await this.planningService.generateShoppingList(req.userId, req.params.menuId);
            res.status(201).json(list);
        } catch (error) {
            next(error);
        }
    }
}
