const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma.js');

class UserController {
    async register(req, res) {
        const { name, password } = req.body;
        if (!name || !password) return res.status(400).json({ message: "Name and password are required" });

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: { name, password: hashedPassword }
            });
            res.status(201).json({ message: "User successfully registered", id: user.id });
        } catch (error) {
            if (error.code === 'P2002') return res.status(400).json({ message: 'Username already exists' });
            res.status(500).json({ message: 'Error registering user' });
        }
    }

    async login(req, res) {
        const { name, password } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { name } });
            if (user && await bcrypt.compare(password, user.password)) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
                return res.json({ token });
            }
            res.status(401).json({ message: 'Invalid credentials' });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in' });
        }
    }
}

module.exports = { UserController };