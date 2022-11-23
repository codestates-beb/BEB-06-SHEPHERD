const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

const userRouter = require('./router/users.route');
const mapRouter = require('./router/maps.route');
const orderRouter = require('./router/orders.route');
const web3Router = require('./router/web3.route');

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json({limit: '100mb'}));
// app.use(express.urlencoded({ limit: '100mb', extended: false }));

app.use('/users', userRouter);
app.use('/maps', mapRouter);
app.use('/orders', orderRouter);
app.use('/web3', web3Router);

app.get("/", (req, res)=> {
    res.status(200).send("Successful");
})

app.listen(PORT, () => {
    console.log(`🚀 Server is working on... http://localhost:${PORT}`);
})

module.exports = app;