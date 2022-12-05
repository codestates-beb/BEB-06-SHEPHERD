require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const checkAuth = require('./middleware/check-auth');

const routes = require('./routes');

const PORT = process.env.PORT;

const app = express();

// 외부 API를 사용하기 위한 CORS 추가
const cors = require('cors');

const corsArray = process.env.CORS.split(',');
console.log(corsArray);

app.use(cors({ origin: process.env.CORS, credentials: true }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkAuth);

app.use('/', routes);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server🚀️]...http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
