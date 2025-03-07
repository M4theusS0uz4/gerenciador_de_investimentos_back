const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Servidor rodando');
});

app.listen(port, () => console.log(`Server started on port ${port}`));