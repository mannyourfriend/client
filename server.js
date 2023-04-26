//Configure Express
const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 5000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'sqlcahnaus',
    password: 'WatchAndra4880',
    database: 'checkers'
})

db.connect((err) => {
    if (err) {
        console.log("Connection error");
        throw err;
    }
    console.log("MySQL connected")
})

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello World');
});

//SQL Functionality

//Add user
app.post('/add/:name', (req, res) => {
    const username = req.params.name;
    let sql = `INSERT INTO users (username, numwins, numlosses) values('${username}',0,0)`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("User added");
    });
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