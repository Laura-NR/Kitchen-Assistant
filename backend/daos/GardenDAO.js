export class GardenDAO {
    constructor(database) {
        this.db = database;
    }

    // --- Plants ---

    async getAllPlants() {
        return this.db.query("SELECT * FROM plants ORDER BY name");
    }

    async addPlant(plantData) {
        const sql = `
      INSERT INTO plants (name, variety, scientific_name, germination_days, watering_frequency_days)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
        const rows = await this.db.query(sql, [
            plantData.name,
            plantData.variety,
            plantData.scientificName,
            plantData.germinationDays,
            plantData.wateringFrequencyDays
        ]);
        return rows[0].id;
    }

    // --- My Plants ---

    async getMyPlants(userId) {
        const sql = `
      SELECT mp.*, p.name, p.variety, p.watering_frequency_days
      FROM my_plants mp
      JOIN plants p ON mp.plant_id = p.id
      WHERE mp.user_id = $1
    `;
        return this.db.query(sql, [userId]);
    }

    async addMyPlant(userId, plantId, nickname, location, plantedAt, image) {
        const sql = `
      INSERT INTO my_plants (user_id, plant_id, nickname, location, planted_at, last_watered_at, image_url)
      VALUES ($1, $2, $3, $4, $5, NOW(), $6)
      RETURNING id
    `;
        const rows = await this.db.query(sql, [
            userId, plantId, nickname, location, plantedAt, image
        ]);
        return rows[0].id;
    }

    async waterPlant(myPlantId) {
        await this.db.query(
            "UPDATE my_plants SET last_watered_at = NOW() WHERE id = $1",
            [myPlantId]
        );
    }

    // --- Sensors ---

    async getSensors(userId) {
        return this.db.query("SELECT * FROM sensors WHERE user_id = $1", [userId]);
    }

    async addSensor(userId, sensorData) {
        const rows = await this.db.query(
            "INSERT INTO sensors (user_id, name, type, data_source_url) VALUES ($1, $2, $3, $4) RETURNING id",
            [userId, sensorData.name, sensorData.type, sensorData.dataSourceUrl]
        );
        return rows[0].id;
    }

    async logReading(sensorId, value) {
        await this.db.query(
            "INSERT INTO sensor_readings (sensor_id, value) VALUES ($1, $2)",
            [sensorId, value]
        );
    }

    async getReadings(sensorId, limit = 50) {
        return this.db.query(
            "SELECT * FROM sensor_readings WHERE sensor_id = $1 ORDER BY timestamp DESC LIMIT $2",
            [sensorId, limit]
        );
    }
}
