const express = require('express')
const app = express()
require('dotenv').config();
const dbConnecction = require('./config/db.js')
const productRoutes = require('./routes/productRoutes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', productRoutes);


const PORT = process.env.PORT;
dbConnecction()
 
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));