import app from './server';
import ENV from './config';

app.listen(ENV.port, () => {
  return console.log(`server is listening on ${ENV.port}`);
});