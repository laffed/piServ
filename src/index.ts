import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());


app.get('/', (req, res, next) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});