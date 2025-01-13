const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const CookieParser = require('cookie-parser');
const connectDB = require('./db/db');
const CaptainRoutes = require('./routes/captain.routes');
connectDB();

app.use(cors());  
app.use(CookieParser());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use('/users', userRoutes);
app.use('/captains', CaptainRoutes);
module.exports = app;