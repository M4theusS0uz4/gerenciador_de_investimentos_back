import config from '../../config/env.js';

export const emailConfig = {
    service: 'gmail',
    user: config.USER_EMAIL,
    pass: config.PASS_EMAIL,
    from: config.FROM_EMAIL,
    host: 'smtp.gmail.com',
    port: config.PORT_EMAIL,
    secure: false,
};