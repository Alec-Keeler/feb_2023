const express = require('express')
const app = express()
require('dotenv').config()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database(process.env.DB_FILE, sqlite3.OPEN_READWRITE);

app.get('/test', (req, res) => {
    res.send('MCU API is live!')
})

app.get('/characters/:id', (req, res) => {
    const sql = 'SELECT * FROM characters WHERE id = ?;'
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.send(err)
        }
        res.json(row)
    })
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))