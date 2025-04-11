import express from 'express';
import { config } from '../../config/env.js';
import userRoutes from './routes/userRoutes.js'

const app = express();
const PORT = config.USER_SERVICE_PORT || 3002;

app.use(express.json());


app.use('/',userRoutes)

app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});
