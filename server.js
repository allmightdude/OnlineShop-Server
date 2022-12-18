const express = require('express');
const morgan = require('morgan');
const cors = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({path : './config/config.env'});

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }))

app.get('/' , (req , res) => {
    res.send('hi')
})

connectDB();

const PORT = process.env.PORT;
app.listen(3000 , () => console.log(`Server Runing on Port : ${PORT}`))