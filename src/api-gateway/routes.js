import express from 'express';
import axios from 'axios';
import config from '../config/env.js'
import { createLogJson } from '../services/log-service/utils/createLogJson.js';
import { getClientInfo } from '../services/log-service/utils/getClientInfo.js';
import { authenticateToken } from './middlewares/authMiddleware.js'

const authRoutes = express.Router();
const userRoutes = express.Router();


const AUTH_SERVICE_URL = `http://localhost:${config.AUTH_SERVICE_PORT}`;  
const USER_SERVICE_URL = `http://localhost:${config.USER_SERVICE_PORT}`;
const LOG_SERVICE_URL =  `http://localhost:${config.LOG_SERVICE_PORT}`;


authRoutes.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});


authRoutes.post('/register', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/register`, req.body);
        if(response?.status == 200){
            const clientInfo = getClientInfo(req); 
            const logData = createLogJson(response.data.id,'Register attemp','User registered sucessfully',clientInfo)
            await axios.post(`${LOG_SERVICE_URL}/createLog`, logData);
            }
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});


userRoutes.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userJson = req.user;
        const response = await axios.get(`${USER_SERVICE_URL}/profile`,{
            data: userJson
        });
        res.status(response.status).json(response.data);  // Retorna resposta do user-service
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});

export default { authRoutes, userRoutes };
