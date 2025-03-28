import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = express.Router();
const userRoutes = express.Router();

// URLs dos microserviços
const AUTH_SERVICE_URL = `http://localhost:${process.env.AUTH_SERVICE_PORT}`;  
const USER_SERVICE_URL = `http://localhost:${process.env.USER_SERVICE_PORT}`;  

// Roteamento para o login
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
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});


userRoutes.get('/profile', async (req, res) => {
    try {
        const response = await axios.get(`${USER_SERVICE_URL}/profile`, {
            headers: {
                Authorization: req.headers.authorization, // Passa o token de autenticação
            }
        });
        res.status(response.status).json(response.data);  // Retorna resposta do user-service
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.response?.data.message || 'Internal Server Error' });
    }
});

export default { authRoutes, userRoutes };
