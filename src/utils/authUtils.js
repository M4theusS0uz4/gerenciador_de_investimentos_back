import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-secret-key'; 
const IV_LENGTH = 16; 
const JWT_SECRET = process.env.JWT || "default_secret";
const key = Buffer.from(ENCRYPTION_KEY, 'hex');
//Function that encrypts the password TH29
export const hashPassword = async (password) => {
    const saltRounds = 10;
    console.log(key)
    return await bcrypt.hash(password,saltRounds);
}
//Function that compares hashed password with hashed password
export const comparePassword = async (password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword);
}

export const generateToken = (userId, userUsername) => {
    return jwt.sign({userId, userUsername}, JWT_SECRET, {expiresIn:"1h"})
}
import crypto from 'crypto';



export const encryptEmail = (email) => {
  const iv = crypto.randomBytes(IV_LENGTH); // 
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv); 
  let encrypted = cipher.update(email, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}


export const decryptEmail = (encryptedEmail) => {
  const [ivString, encrypted] = encryptedEmail.split(':');
  const iv = Buffer.from(ivString, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}