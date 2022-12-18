const express = require('express');
const morgan = require('morgan');
const cors = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }))

app.get('/' , (req , res) => {
    res.send('hi')
})

app.listen(3000 , () => console.log(`Server Runing on Port : 3000`))