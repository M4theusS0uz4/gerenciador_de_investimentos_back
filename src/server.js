import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; 
import express from 'express'
import dotenv from 'dotenv'

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(cors()); 


app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Server Working');
});

app.listen(port, () => console.log(`Server started on port ${port}`));
