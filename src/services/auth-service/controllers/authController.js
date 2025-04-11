import { hashPassword, hashEmail, comparePassword, generateToken } from '../utils/authUtils.js';
import prisma from '../../../prisma/prismaClient.js';
import logger from '../../log-service/utils/logger.js'

export const registerUser = async (req,res) => {
    const {username, password, email} = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
        data: {
            username,
            email: hashEmail(email),
            password: hashedPassword,
        },
    });

    if (newUser) {
        logger.info(`Usuário Registrado! ID: ${newUser.id_user}`);
        res.status(200).json({ message: "User registered successfully.", id:newUser.id_user });
    } else {
        logger.info(`Erro ao registrar usuário!`);
        res.status(500).json({ message: "Failed to register user." });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        logger.info(`Tentativa de login!`)
        return res.status(400).json({ message: "Email and password are required." });
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: hashEmail(email),  
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            logger.info(`Tentativa de login, senha incorreta! ID usuárip: ${user.id_user}`)
            return res.status(401).json({ message: "Invalid password." });
        }
        const token = generateToken(user.id_user, user.username)
        logger.info(`Login realizado! ID user: ${user.id_user}`)
        return res.status(200).json({ data: "Login successful.", token: token});

    } catch (error) {
        logger.info("Erro ao realizar login! " + error)
        return res.status(500).json({ message: "Internal server error." });
    }
};

