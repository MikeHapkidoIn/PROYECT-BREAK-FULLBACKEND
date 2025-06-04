const express = require('express')
const app = express()
require('dotenv').config();
const dbConnecction = require('./config/db.js')
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const productApiRoutes = require('./routes/productApiRoutes');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // Mira este log para confirmar que está detectando el método
    console.log('Método override detectado:', req.body._method);
    return req.body._method;
  }
}));
app.use(express.json())

app.use('/', productRoutes);
app.use('/api', productApiRoutes);
const PORT = process.env.PORT;
dbConnecction()
 
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
