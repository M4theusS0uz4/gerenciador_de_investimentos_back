import express from 'express';
import { config } from '../../config/env.js';
import investmentRoutes from './routes/investmentRoutes.js'

const app = express();
const PORT = config.INVESTMENT_SERVICE_PORT;

app.use(express.json());
app.use('/', investmentRoutes)

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});
