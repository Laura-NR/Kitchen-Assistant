import { Router } from 'express';
import { GardenController } from '../controllers/GardenController.js';
import { GardenService } from '../services/GardenService.js';
import { GardenDAO } from '../daos/GardenDAO.js';
import { Database } from '../config/database.js';
import verifyToken from '../middleware/auth-middleware.js';
import { upload } from '../config/multer.js';

const gardenRouter = () => {
    const router = Router();
    const database = new Database();
    const gardenDAO = new GardenDAO(database);
    const gardenService = new GardenService(gardenDAO);
    const gardenController = new GardenController(gardenService);

    // Plants (Master List)
    router.get('/plants', verifyToken, (req, res) => gardenController.getAllPlants(req, res));

    // My Plants
    router.get('/my-plants', verifyToken, (req, res) => gardenController.getMyPlants(req, res));
    router.post('/my-plants', verifyToken, upload.single('image'), (req, res) => gardenController.addMyPlant(req, res));
    router.put('/my-plants/:id/water', verifyToken, (req, res) => gardenController.waterPlant(req, res));

    return router;
};

export default gardenRouter;
