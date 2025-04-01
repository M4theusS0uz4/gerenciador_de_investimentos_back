import { hashPassword, hashEmail, comparePassword, generateToken } from '../utils/authUtils.js';
import prisma from '../../../prisma/prismaClient.js';
import { getClientInfo } from '../../log-service/utils/getClientInfo.js';
import { createLogJson } from '../../log-service/utils/createLogJson.js';
import { createLog } from '../../log-service/controllers/logController.js';


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
        const infoClient = getClientInfo();
        const dataLog = createLogJson(newUser.id_user, "USER_CREATED", "New user registered", infoClient);
        createLog(dataLog);
        res.status(200);
    }else{
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

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
            return res.status(401).json({ message: "Invalid password." });
        }
        const token = generateToken(user.userId, user.username)
        return res.status(200).json({ data: "Login successful.", token: token});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

