import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client'

import generateToken from '../utils/generateToken.js'

const prisma = new PrismaClient()

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const idImage = req.file ? req.file.path : null;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: idImage && role ? role : "STUDENT",
            idImage
        },
        });

        res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser.id)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Signup failed" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user.id)
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
}

