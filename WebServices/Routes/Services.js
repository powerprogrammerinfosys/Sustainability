const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const hostname='us-cdbr-iron-east-03.cleardb.net';
const username='b4f7c01ae0bb8c';
const password='e59ca691';
const database='heroku_49e3f29730d5925';

//
router.get("/user/:user",(req,res)=>{
    const connection=mysql.createConnection({
        host:hostname,
        user:username,
        password:password,
        database:database
    });
    console.log(req.params.user);
    const query = "Select username from UserTable where username='"+req.params.user+"'";
    connection.query(query,(err,rows,field)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
        res.json(rows);
        connection.end();
        if(err){
          connection.end();
          throw err;
        }

        })
})

// Service for getting carbon emission from table
router.get("/carbonemission",(req,res)=>{
    const connection=mysql.createConnection({
        host:hostname,
        user:username,
        password:password,
        database:database
    });
    console.log(req.params.user);
    const query = "Select * from CarbonEmission";
    connection.query(query,(err,rows,field)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
        res.json(rows);
        connection.end();
        if(err){
          connection.end();
          throw err;
        }

        })
})

// Service for getting value on specific date
router.get("/carbonemission/:date",(req,res)=>{
    const connection=mysql.createConnection({
        host:hostname,
        user:username,
        password:password,
        database:database
    });
    console.log(req.params.date);
    const query = "Select * from CarbonEmission where YYYYMM='"+req.params.date+"'";
    connection.query(query,(err,rows,field)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
        res.json(rows);
        connection.end();
        if(err){
          connection.end();
          throw err;
        }

        })
})

module.exports=router;
