import { Router } from 'express';
import { Database } from '../config/database.js';
import verifyToken from '../middleware/auth-middleware.js';

import { ZeroWasteDAO } from '../daos/ZeroWasteDAO.js';
import { ZeroWasteService } from '../services/ZeroWasteService.js';
import { ZeroWasteController } from '../controllers/ZeroWasteController.js';

const router = Router();

const db = new Database();
const zeroWasteDAO = new ZeroWasteDAO(db);
const zeroWasteService = new ZeroWasteService(zeroWasteDAO);
const zeroWasteController = new ZeroWasteController(zeroWasteService);

const zeroWasteRouter = () => {

    router.get('/tips', verifyToken, (req, res, next) => zeroWasteController.getTips(req, res, next));
    router.post('/tips', verifyToken, (req, res, next) => zeroWasteController.addTip(req, res, next));

    return router;
};

export default zeroWasteRouter;
