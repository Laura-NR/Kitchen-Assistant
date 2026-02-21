import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

export class Database {
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 5432,
    });
  }

  async query(text, params) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows; // pg returns result object with rows in .rows
    } finally {
      client.release();
    }
  }
}