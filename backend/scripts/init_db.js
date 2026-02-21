import { Database } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database();

async function runSchema() {
  try {
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Split by semicolon to execute multiple statements, filtering out empty ones
    const statements = schemaSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (const statement of statements) {
      try {
        await db.query(statement);
        console.log('Executed statement successfully.');
      } catch (err) {
        console.error('FAILED Statement:', statement);
        console.error('Error Details:', err);
      }
    }

    console.log('Database schema setup complete.');
    process.exit(0);
  } catch (error) {
    console.error('Failed to run schema script:', error);
    process.exit(1);
  }
}

runSchema();
