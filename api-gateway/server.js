import express from 'express';
import routes from './routes.js';  // Roteamento para os microserviços
import dotenv from 'dotenv';
import errorHandler from './middlewares/erroHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());

// Routes services
app.use('/auth', routes.authRoutes); 
app.use('/user', routes.userRoutes);

// If an error occurs, this middleware handles it
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});
