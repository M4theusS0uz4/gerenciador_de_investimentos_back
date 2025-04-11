import express from 'express';
import authRoutes from './routes/authRoutes.js'; // Controladores de autenticação
import { config } from '../../config/env.js';

const app = express();
const PORT = config.AUTH_SERVICE_PORT || 3001;

app.use(express.json());
app.use('/',authRoutes)

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});
