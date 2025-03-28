import express from 'express';
import { registerUser, loginUser } from './controllers/authController.js'; // Controladores de autenticação
import { config } from '../../config/env.js';

const app = express();
const PORT = config.AUTH_SERVICE_PORT || 3001;

app.use(express.json());

// Rotas de autenticação
app.post('/login', loginUser);
app.post('/register', registerUser);

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});
