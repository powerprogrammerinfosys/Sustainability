const express = require('express');

const app = express();
const mysql = require('mysql');
const morgan = require('morgan');

app.use(morgan('combined'));

const routerUser = require('./Routes/Services.js');

app.use(routerUser);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server is up and listening on:"+PORT)
})