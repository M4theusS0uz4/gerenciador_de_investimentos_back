import express from 'express';
import { config } from '../../config/env.js';

const app = express();
const PORT = config.INVESTMENT_SERVICE_PORT;

app.use(express.json());
app.use('/')

app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}`);
});
