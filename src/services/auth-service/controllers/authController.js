import { hashPassword, hashEmail, comparePassword, generateToken } from '../utils/authUtils.js';
import prisma from '../../../prisma/prismaClient.js';
import { getClientInfo } from '../../log-service/utils/getClientInfo.js';
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
        logger.info(`Usuário Registrado! Email: ${email}`)
        res.status(200);
    }else{
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    logger.info(`Tentativa de login, email usuário:${email}`)
    if (!email || !password) {
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
            logger.info(`Tentativa de login, senha incorreta!`)
            return res.status(401).json({ message: "Invalid password." });
        }
        const token = generateToken(user.userId, user.username)
        logger.info(`Login realizado! Email: ${email}`)
        return res.status(200).json({ data: "Login successful.", token: token});

    } catch (error) {
        logger.info("Erro ao realizar login! " + error)
        return res.status(500).json({ message: "Internal server error." });
    }
};

