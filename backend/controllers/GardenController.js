export class GardenController {
    constructor(gardenService) {
        this.gardenService = gardenService;
    }

    async getMyGarden(req, res, next) {
        try {
            const plants = await this.gardenService.getMyGarden(req.userId);
            res.json(plants);
        } catch (error) {
            next(error);
        }
    }

    async addPlantToGarden(req, res, next) {
        try {
            const result = await this.gardenService.registerPlant(req.userId, req.body);
            res.status(201).json({ success: true, id: result });
        } catch (error) {
            next(error);
        }
    }

    async addMyPlant(req, res) {
        try {
            const userId = req.user.id;
            const { plantId, nickname, location, plantedAt } = req.body;
            let imageName = req.file ? req.file.filename : null;

            const newPlantId = await this.gardenService.addMyPlant(userId, plantId, nickname, location, plantedAt, imageName);
            res.status(201).json({ id: newPlantId, message: 'Plant added to your garden' });
        } catch (error) {
            console.error('Error adding my plant:', error);
            res.status(500).json({ error: 'Failed to add plant' });
        }
    }

    async waterPlant(req, res, next) {
        try {
            await this.gardenService.waterPlant(req.userId, req.params.id);
            res.json({ success: true });
        } catch (error) {
            next(error);
        }
    }

    async listMasterPlants(req, res, next) {
        try {
            const plants = await this.gardenService.getMasterPlantList();
            res.json(plants);
        } catch (error) {
            next(error);
        }
    }
}
