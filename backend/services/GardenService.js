export class GardenService {
    constructor(gardenDAO) {
        this.gardenDAO = gardenDAO;
    }

    async getMyGarden(userId) {
        return this.gardenDAO.getMyPlants(userId);
    }

    async addMyPlant(userId, plantId, nickname, location, plantedAt, image) {
        return this.gardenDAO.addMyPlant(
            userId,
            plantId,
            nickname,
            location,
            plantedAt,
            image
        );
    }

    async waterPlant(userId, myPlantId) {
        // Verify ownership (skipped for brevity, but should be done)
        return this.gardenDAO.waterPlant(myPlantId);
    }

    async getMasterPlantList() {
        return this.gardenDAO.getAllPlants();
    }
}
