const express = require('express');
const bodyParser = require('body-parser');
const routers = require('../routes');
const app = express();
const HttpStatus = require('http-status');
const validate = require('express-validation');
const APIError = require('./APIError');
const passport = require('passport');
const jsonwebtoken = require("jsonwebtoken");
var secret = process.env.JWT_KEY;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, DELETE');
    return res.status(200).json({});
  }
  next();
})

app.use('/', routers);

app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    const msg = err.errors.map(error => error.messages.join('.')).join(' and ');
    const e = new APIError(HttpStatus.BAD_REQUEST, `${msg}`);
    return next(e);
  } else if (!(err instanceof APIError)) {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const e = new APIError(status, err.message);
    return next(e);
  }
  return next(err);
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    }
  })
})

module.exports = app;
