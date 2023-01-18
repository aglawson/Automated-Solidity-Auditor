import solc from 'solc'
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());

const PORT = '8080'

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT);
});

app.get('/', (req, res) => {
    res.send('sup dude');
});

app.get('/compile', async (req, res) => {
    const contract_code = req.query.contract_code;
    const result = solc.compile(contract_code);
    res.send(result);
});