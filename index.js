const express = require('express');
const userRoute = require('./routes/api/users');
const aboutRoute = require('./routes/api/abouts');
const eventRoute = require('./routes/api/events');
const routeCompany = require('./routes/api/company');
const connectDB = require('./config/connectDB');
const FaqRoute = require('./routes/api/faqs');
const routeContact = require('./routes/api/contacts');
// var multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

//connect to db
connectDB();

app.use(express.json());

var PORT = process.env.PORT || 5000;

app.use('/api/user', userRoute);
app.use('/faqs', FaqRoute);
app.use('/api/events', eventRoute);
app.use('/api/aboutUs', aboutRoute);
app.use('/api/contact', routeContact);
app.use('/api/company', routeCompany);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
app.listen(PORT);