import express from 'express';
import { config } from '../../config/env.js';
import { profile } from './controllers/userController.js'

const app = express();
const PORT = config.USER_SERVICE_PORT || 3002;

app.use(express.json());


app.get('/profile', profile)

app.listen(PORT, () => {
    console.log(`User service is running on port ${PORT}`);
});
