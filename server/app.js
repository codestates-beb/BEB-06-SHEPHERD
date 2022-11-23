const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");

const PORT = 3001;

const app = express();

// 외부 API를 사용하기 위한 CORS 추가
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json());

app.use("/", routes);

module.exports = app.listen(PORT, () => {
  console.log(`[server🚀️]... http://localhost:${PORT}`);
});
