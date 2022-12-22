const express = require("express");
const morgan = require("morgan");
const cors = require("morgan");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");

const User = require("./models/User");
dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api' , require('./routes/product'));
app.use('/api' , require('./routes/category'));
app.use('/api' , require('./routes/owner'));

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server Runing on Port : ${PORT}`));
