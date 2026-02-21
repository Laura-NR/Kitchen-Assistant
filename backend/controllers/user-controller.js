import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Database } from '../config/database.js';
import 'dotenv/config';

export class UserController {
    constructor() {
        this.db = new Database();
    }

    // User registration
    async register(req, res) {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            // Check if user exists
            const existing = await this.db.query('SELECT * FROM users WHERE name = $1', [name]);
            if (existing.length > 0) {
                return res.status(409).json({ message: "User already exists" });
            }

            await this.db.query(
                'INSERT INTO users (name, password) VALUES ($1, $2)',
                [name, hashedPassword]
            );

            res.status(201).json({ message: "User successfully registered" });
        } catch (error) {
            console.error('Registration error:', error.message);
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    // User login
    async login(req, res) {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Name and password are required" });
        }
        try {
            const users = await this.db.query('SELECT * FROM users WHERE name = $1', [name]);

            if (users.length > 0) {
                const user = users[0];
                if (await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            console.error('Login error:', error.message);
            res.status(500).json({ message: 'Error logging in' });
        }
    }
}
