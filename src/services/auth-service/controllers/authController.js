import { hashPassword, hashEmail, comparePassword, generateToken } from '../utils/authUtils.js';
import prisma from '../../../prisma/prismaClient.js';
import { getClientInfo } from '../../log-service/utils/getClientInfo.js';
import { createLogJson } from '../../log-service/utils/createLogJson.js';
import { createLog } from '../../log-service/controllers/logController.js';

export const registerUser = async (username, email, password) => {
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
    }

    return "User created successfully.";
};

export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: {
            email: hashEmail(email),
        },
    });

    if (!user) {
        return { message: "User not found" };
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return { message: "Invalid password" };
    }

    const token = generateToken(user.id_user, user.username);
    return { message: "Login successful", token };
};
