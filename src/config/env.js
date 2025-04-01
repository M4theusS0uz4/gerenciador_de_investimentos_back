import dotenv from 'dotenv';

dotenv.config();

export const config = {
    JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
    PORT: process.env.AUTH_SERVICE_PORT || 3000,
    AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT || 3001,
    USER_SERVICE_PORT: process.env.USER_SERVICE_PORT || 3002,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    DATABASE_URL: process.env.DATABASE_URL || undefined
};

export default config;