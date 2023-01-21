const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api' , require('./routes/product'));
app.use('/api' , require('./routes/category'));
app.use('/api' , require('./routes/owner'));
app.use('/api' , require('./routes/auth'));
app.use('/api' , require('./routes/review'));
app.use('/api' , require('./routes/address'));
app.use('/api' , require('./routes/payment'));

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server Runing on Port : ${PORT}`));
