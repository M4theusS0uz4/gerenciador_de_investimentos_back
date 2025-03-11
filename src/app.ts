import  express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response) => {
    res.send('Server Working');
});

app.listen(port, () => console.log(`Server started on port ${port}`));