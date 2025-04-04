import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { config } from '../../../config/env.js'

export const hashEmail = (email) => {
  return crypto.createHash('sha256').update(email).digest('hex');
};

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}


export const comparePassword = async (password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (id_user, userUsername) => {
    return jwt.sign({ id_user, userUsername }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES_IN });
}
