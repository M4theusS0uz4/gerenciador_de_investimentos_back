import express from 'express';
import { createLog } from './controllers/logController.js';
import { config } from '../../config/env.js';

const app = express();

const PORT = config.LOG_SERVICE_PORT || 3003;

app.use(express.json())

app.post('/createLog', createLog)

app.listen(PORT, () =>{
    console.log(`Log service is running on port ${PORT}`)
});