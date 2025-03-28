import express from 'express';
import { config } from '../../config/env.js';

const app = express();
const PORT = config.USER_SERVICE_PORT || 3002;

app.use(express.json());


app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});
