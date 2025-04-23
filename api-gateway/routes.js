import express from 'express';
import axios from 'axios';
import config from '../src/config/env.js'
import { createLogJson } from '../src/services/log-service/utils/createLogJson.js';
import { getClientInfo } from '../src/services/log-service/utils/getClientInfo.js';
import { authenticateToken } from './middlewares/authMiddleware.js'

const authRoutes = express.Router();
const userRoutes = express.Router();


const AUTH_SERVICE_URL = `http://localhost:${config.AUTH_SERVICE_PORT}`;  
const USER_SERVICE_URL = `http://localhost:${config.USER_SERVICE_PORT}`;
const LOG_SERVICE_URL =  `http://localhost:${config.LOG_SERVICE_PORT}`;


authRoutes.post('/login', async (req, res) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        if(response?.status == 200){
            const clientInfo = getClientInfo(req); 
            console.log(response)
            const logData = createLogJson(response.data.id,'Loggin attemp','User logged sucessfully',clientInfo)
            await axios.post(`${LOG_SERVICE_URL}/createLog`, logData);
            }
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});


authRoutes.post('/registro', async (req, res) => {
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


userRoutes.get('/perfil', authenticateToken, async (req, res) => {
    try {
        const userJson = req.user;
        const response = await axios.get(`${USER_SERVICE_URL}/profile`, {
            params: {
              id_user: userJson.id_user,
              userUsername: userJson.userUsername,
            }
          });
        res.status(response.status).json(response.data);  
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});

userRoutes.post('/mudarSenha', authenticateToken, async (req,res) => {
    try{
        const userJson = req.user;
        const { userEmail, newPassword } = req.body;
        const response = await axios.post(`${USER_SERVICE_URL}/changePassword`, {userEmail:userEmail, newPassword:newPassword, id_user:userJson.id_user, userusername:userJson.userUsername});
        if(response?.status == 200){
            const clientInfo = getClientInfo(req); 
            const logData = createLogJson(response.data.id,'Attemp to change password',`Password changed | Id:${userJson.id_user}`,clientInfo)
            await axios.post(`${LOG_SERVICE_URL}/createLog`, logData);
            }
        res.status(response.status).json(response.data); 
    }catch(error){
        console.log(error)
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
})

export default { authRoutes, userRoutes };
