const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const connectDB = require('./db/db');
connectDB();
app.use(cors());  
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(express.json());
app.use('/users', userRoutes);

module.exports = app;