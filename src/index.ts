import express from 'express';
import cors from 'cors';
import clocker from './clocker';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());


app.get('/', (req, res, next) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.get('/status', async (req, res, next) => {
  clocker();
  res.send('Oh yeah baby')
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});