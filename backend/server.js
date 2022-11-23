const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('../backend/middleware/errorMiddleware.js');
const { connectDB } = require('../backend/config/db.js');
const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.get('/api/users' , (req,res) => {
    res.json({message : "welcome to helpKaro API"});
})

app.use('/api/users' , require('./routes/userRoutes.js'))

app.use(errorHandler);

app.listen(PORT , () => console.log(`server started on port ${PORT}`));