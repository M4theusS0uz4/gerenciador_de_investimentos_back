import jwt from 'jsonwebtoken';
import config from '../../src/config/env.js';
import logger from '../../src/services/log-service/utils/logger.js';
import { getClientInfo}  from '../../src/services/log-service/utils/getClientInfo.js';
import axios from 'axios';
import { createLogJson } from '../../src/services/log-service/utils/createLogJson.js';
import { promisify } from 'util';

const JWT_SECRET_KEY = config.JWT_SECRET;
const LOG_SERVICE_URL = 'http://localhost:' + config.LOG_SERVICE_PORT + '/createLog';
const verifyAsync = promisify(jwt.verify);

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const clientInfo = getClientInfo(req);

    if (!authHeader) {
        logger.info("Usuário não autenticado | Detalhes usuário: " + clientInfo);
        return res.status(401).json({ message: "Token de autenticação não fornecido" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        logger.info("Tentativa de acesso com token ausente ou malformado | Detalhes usuário: " + clientInfo);
        return res.status(401).json({ message: "Token malformado ou ausente" });
    }

    try {
        const user = await verifyAsync(token, JWT_SECRET_KEY);
        req.user = user;
        next();
    } catch (err) {
        logger.info("Tentativa de acesso com token inválido ou expirado | Detalhes usuário: " + clientInfo);
        
        const data = createLogJson(null, 'Warning', 'Tentativa de acesso com token inválido ou expirado', clientInfo);
        try {
            await axios.post(LOG_SERVICE_URL, data);
        } catch (error) {
            logger.error("Erro ao enviar log ao log-service: " + error.message);
        }

        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
};
