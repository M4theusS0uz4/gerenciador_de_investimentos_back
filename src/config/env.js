import dotenv from 'dotenv';

dotenv.config();

export const config = {
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: process.env.AUTH_SERVICE_PORT,
    AUTH_SERVICE_PORT: process.env.AUTH_SERVICE_PORT,
    USER_SERVICE_PORT: process.env.USER_SERVICE_PORT,
    LOG_SERVICE_PORT: process.env.LOG_SERVICE_PORT,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
    DATABASE_URL: process.env.DATABASE_URL,
    USER_EMAIL: process.env.USER_EMAIL,
    PASS_EMAIL: process.env.PASS_EMAIL,
    FROM_EMAIL: process.env.FROM_EMAIL,
    PORT_EMAIL: process.env.PORT_EMAIL
};

export default config;