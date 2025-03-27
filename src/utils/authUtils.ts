import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT;

//Function that encrypts the password TH29
export const hashPassword = async (password: string): Promise<String> => {
    const saltRounds = 10;
    return await bcrypt.hash(password,saltRounds);
}
//Function that compares hashed password with hashed password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> =>{
    return await bcrypt.compare(password, hashedPassword);
}
