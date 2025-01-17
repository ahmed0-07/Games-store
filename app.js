require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();

const PORT = process.env.PORT || 5000;

//database connection
const connectDB = require('./server/config/db');
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

//template engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL
    })
}));

app.use('/', require('./server/routes/main'));
app.use('/user', require('./server/routes/user'));
app.use('/admin', require('./server/routes/admin'));

app.listen(PORT, () => {
    console.log('server is running....');
});