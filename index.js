const express = require('express')
const app = express()
require('dotenv').config();
const dbConnecction = require('./config/db.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
res.send('funciona')
})

const PORT = 3000
dbConnecction()
 
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));