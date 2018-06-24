const express = require('express');
const bodyparser = require('body-parser');

const lambda = require('./lambda/src');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.post('/', (req, res) => {
  lambda.handler(req.body, req.body.context, (error, handlerResponse) => {
    if (error) {
      const timestamp = new Date().toISOString();
      console.error(timestamp, error);

      return res.status(500).send(error.toString());
    }
    return res.status(200).json(handlerResponse);
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
