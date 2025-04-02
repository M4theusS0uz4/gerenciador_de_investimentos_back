import express from 'express';
import routes from './routes.js';  // Roteamento para os microserviços
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

// Roteamento
app.use('/auth', routes.authRoutes);  // Roteia para o auth-service
app.use('/user', routes.userRoutes);  // Roteia para o user-service

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
