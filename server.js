const express = require('express');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const dbConnect = require('./config/db');

require('./cron/expireSubscriptions');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require("path")
app.use("/invoices", express.static(path.join(__dirname, "invoices")));

dbConnect();

app.use(express.json());
app.use(cookieParser());

const cors = require('cors');
app.use(cors({
    origin : "*",
    credentials: true
}))


const usersRouter = require('./routes/usersRoute');
app.use('/users', usersRouter);

const servicesRoute = require('./routes/serviceRoute');
app.use('/services', servicesRoute);

const subscriptionRoute = require('./routes/subscriptionRoute');
app.use('/subscriptions', subscriptionRoute);

const paymentRoute = require('./routes/paymentRoute');
app.use('/payments', paymentRoute);

const analyticsRoute = require('./routes/analyticsRoute');
app.use('/analytics', analyticsRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});