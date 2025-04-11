import express from 'express';
import { config } from '../../config/env.js';
import logRoutes from './routes/logRoutes.js'

const app = express();

const PORT = config.LOG_SERVICE_PORT || 3003;

app.use(express.json())

app.use('/', logRoutes)

app.listen(PORT, () =>{
    console.log(`Log service is running on port ${PORT}`)
});