const express = require('express');

const app = express();

app.use(
  express.urlencoded({
    extended:false,
  }),
)

app.use(express.json());

app.use( function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
  next();
});

require('./controllers/authController')(app);

app.listen(8000);