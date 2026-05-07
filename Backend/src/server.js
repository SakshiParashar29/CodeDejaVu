require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const userRoutes = require('./routes/user-routes');
const problemRoutes = require('./routes/problem-routes');

const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


connectDB();

app.use('/auth', userRoutes);
app.use('/problem', problemRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})