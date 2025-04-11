import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { PrismaClient } from '@prisma/client'

import generateToken from '../utils/generateToken.js'

const prisma = new PrismaClient()

export const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    const idImage = req.file ? req.file.path : null;

    console.log('📝 Signup attempt:', { email, role, hasIdImage: !!idImage });

    try {
        console.log('🔍 Checking for existing user...');
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            console.log('❌ User already exists:', email);
            return res.status(400).json({ error: "Email already registered" });
        }

        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log('📝 Creating new user...');
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: idImage && role ? role : "STUDENT",
                idImage
            },
        });
        console.log('✅ User created successfully:', { id: newUser.id, email: newUser.email });

        const token = generateToken(newUser.id);
        console.log('🔑 Generated JWT token for new user');

        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token: token
        });
    } catch (err) {
        console.error('❌ Signup error:', err);
        res.status(500).json({ error: "Signup failed", details: err.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('🔑 Login attempt for email:', email);
    
    try {
        console.log('🔍 Searching for user in database...');
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            console.log('❌ User not found for email:', email);
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        console.log('✅ User found:', { id: user.id, email: user.email, role: user.role });
        console.log('🔐 Comparing passwords...');
        
        const valid = await bcrypt.compare(password, user.password);
        
        if (!valid) {
            console.log('❌ Password mismatch for user:', email);
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        console.log('✅ Password verified successfully');
        const token = generateToken(user.id);
        console.log('🔑 Generated JWT token for user:', user.id);

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        });
    } catch (err) {
        console.error('❌ Login error:', err);
        res.status(500).json({ error: "Login failed", details: err.message });
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: "Failed to fetch user details" });
    }
}

