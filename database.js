const mysql = require('mysql2');

const pool = mysql.createPool({
        host: '127.0.0.1',
        user: 'sqlcahnaus',
        password: 'WatchAndra4880',
        database: 'checkers'
    }).promise();

async function getRanking() {
    const [rows] = await pool.query("SELECT username FROM users ORDER BY numwins - numlosses desc limit 10");
    return rows;
}

async function addUser(username) {
    const [result] = await pool.query('INSERT INTO users (username, numwins, numlosses) values (?, 0, 0)',[username]);
    return {
        userID: result.insertId,
        username
    }
}

async function addLoss(username) {
    const [result] = await pool.query('UPDATE users SET numlosses = numlosses + 1 WHERE username = ?',[username]);
    return;
}

async function addWin(username) {
    const [result] = await pool.query('UPDATE users SET numwins = numwins + 1 WHERE username = ?', [username]);
    return;
}

//module.exports = { getRanking, addUser, addLoss, addWin };