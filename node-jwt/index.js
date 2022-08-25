const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.get('/api',(req,res) => {
    res.json({
        message: "Hello There"
    });
});

app.post('/api/posts',verifyToken,(req,res) => {
    jwt.verify(req.token,'secretkey',(err,authData) => {
        if(err) {
            res.sendStatus(401);
        }
        else
        {
            res.json({
                message: "Post Created",
                authData
            });
        }
    })
    
});

app.post('/api/login',(req,res) => {
    const user = {
        id: 1,
        username: "John",
        email: "john@john.com"
    }
    
    jwt.sign({user: user},'secretkey',(err,token) => {
        res.json({
            token,
        });
    });
});

function verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    } 
    else{
        res.sendStatus(403)
    }
}

app.listen(3000,(req,res) => {
    console.log("Server Started a t 30000")
})