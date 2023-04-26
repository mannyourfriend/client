//Configure Express
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const PORT = 5000;
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);
var crypto = require('crypto');
let users=[];
let profanityArray = ['ass', 'bitch', 'crap','cunt', 'cock', 'dick', 'douche', 'fuck', 'hoe', 'piss', 'shit',
'wench'];

//Create a connection and connect to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'mannyourfriend',
    password: 'ASDFGHJKL;',
    database: 'checkers'
})
db.connect((err) => {
    if (err) {
        console.log("Connection error");
        throw err;
    }
    console.log("MySQL connected")
})

//Socket.io
io.on('connection', socket => {
    console.log('New WS Connection');
    //handle accordingly

    socket.on('disconnect', () => {
        //emit
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});


//SQL Functionality

//Add user
app.post('/add/:name', (req, res) => {
    let { username, password } = req.body;
    let nameTaken = false;

    // Check if username is taken
    users.forEach(name => {
        if (name==username){
            nameTaken = true;
            io.sockets.to(socket.id).emit("error", {errorType: "registration", errorMessage: "This login name is taken"});
        }
    });

    //profanity filter
    profanityArray.forEach(profanity => {
        let regex = new RegExp(profanity);
        if (username.match(regex)!=null){
            nameTaken = true;
            io.sockets.to(socket.id).emit("error", {errorType: "registration", errorMessage: "Potty Mouth! Try a different username."});
        }
    })

    if (!nameTaken){
        users.push(username)
        let hash = crypto.createHash('sha256').update(password).digest('hex');
        let stringHash = String(hash);
        let sql = `INSERT INTO users (userID, username, numwins, numlosses, password) VALUES (NULL, '${username}', '0', '0', '${stringHash}');`
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
                return;
            }
            console.log(result);
            res.send("User added");
        });
        
    }  
    
    
})
//user login
app.post('/log/:name', (req, res) => {
    let { username, password } = req.body;
    let nameTaken = false;

    // Check if username exists
    users.forEach(name => {
        if (name==username){
            nameTaken = true;
        }
    });

    if (!nameTaken){
        users.push(username)
        let hash = crypto.createHash('sha256').update(password).digest('hex');
        let stringHash = String(hash);
        let sql = `SELECT * FROM users WHERE username LIKE '${username}' AND password LIKE '${stringHash}'`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err;
                return;
            }
            console.log(result);
            res.send("User logged");
        });
        
    }  
    
    
})

//User loss
app.post('/loss/:name', (req, res) => {
    const username = req.params.name;
    let sql = `UPDATE users SET numlosses = numlosses + 1 WHERE username = '${username}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Loss updated");
    });
})

//User wins
app.post('/win/:name', (req, res) => {
    const username = req.params.name;
    let sql = `UPDATE users SET numwins = numwins + 1 WHERE username = '${username}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Win updated");
    });
})

//Get leaderboard
app.get("/board", (req, res) => {
    let sql = `SELECT username FROM users ORDER BY numwins - numlosses desc limit 10`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));