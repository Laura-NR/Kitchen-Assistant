import { Database } from '../config/database.js';

const db = new Database();

async function migrate() {
    try {
        console.log("Starting migration: Add image_url to my_plants...");

        await db.query(`
            ALTER TABLE my_plants 
            ADD COLUMN IF NOT EXISTS image_url VARCHAR(255);
        `);

        console.log("Migration successful!");
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await db.pool.end();
    }
}

migrate();
