import { Router } from 'express';
import { Database } from '../config/database.js';
import verifyToken from '../middleware/auth-middleware.js';

// DAOs
import { InventoryDAO } from '../daos/InventoryDAO.js';
import { PlanningDAO } from '../daos/PlanningDAO.js';
import { RecipeDAO } from '../daos/RecipeDAO.js';

// Services
import { InventoryService } from '../services/InventoryService.js';
import { PlanningService } from '../services/PlanningService.js';

// Controllers
import { InventoryController } from '../controllers/InventoryController.js';
import { PlanningController } from '../controllers/PlanningController.js';

const router = Router();

// Dependencies
const db = new Database();
const inventoryDAO = new InventoryDAO(db);
const planningDAO = new PlanningDAO(db);
const recipeDAO = new RecipeDAO(db); // Needed for planning service

const inventoryService = new InventoryService(inventoryDAO);
const planningService = new PlanningService(planningDAO, inventoryDAO, recipeDAO);

const inventoryController = new InventoryController(inventoryService);
const planningController = new PlanningController(planningService);

const kitchenRouter = () => {

    // --- Inventory Routes ---
    router.get('/inventory', verifyToken, (req, res, next) => inventoryController.getInventory(req, res, next));
    router.post('/inventory', verifyToken, (req, res, next) => inventoryController.addToInventory(req, res, next));
    router.delete('/inventory/:id', verifyToken, (req, res, next) => inventoryController.remove(req, res, next));
    router.get('/ingredients/search', verifyToken, (req, res, next) => inventoryController.searchIngredients(req, res, next));

    // --- Planning Routes ---
    router.get('/menus', verifyToken, (req, res, next) => planningController.listMenus(req, res, next));
    router.post('/menus', verifyToken, (req, res, next) => planningController.createMenu(req, res, next));
    router.get('/menus/:id', verifyToken, (req, res, next) => planningController.getMenu(req, res, next));

    // Menu Items
    router.post('/menus/:menuId/items', verifyToken, (req, res, next) => planningController.addMenuItem(req, res, next));
    router.delete('/menus/items/:itemId', verifyToken, (req, res, next) => planningController.removeMenuItem(req, res, next));

    router.post('/menus/:menuId/shopping-list', verifyToken, (req, res, next) => planningController.generateShoppingList(req, res, next));

    return router;
};

export default kitchenRouter;
