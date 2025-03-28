import { hashPassword, encryptEmail } from '../utils/authUtils.js';
import prisma  from '../prisma/prismaClient.js';


export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields must be filled in." });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: "The email format is incorrect." });
    }

    try {
        const hashedPassword = await hashPassword(password); // Criptografa a senha
        const encryptedEmailUser = encryptEmail(email);
        const newUser = await prisma.user.create({
            data: {
                username,
                email: encryptedEmailUser,
                password: hashedPassword,
            },
        });
        console.log(newUser);
        return res.status(200).json({ message: "User created successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
