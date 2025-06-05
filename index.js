const express = require('express');
const app = express();
require('dotenv').config();
const dbConnecction = require('./config/db.js');
const productRoutes = require('./routes/productRoutes');
const productApiRoutes = require('./routes/productApiRoutes');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(methodOverride('_method'));
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
  return null;
}));


app.use(session({
  secret: process.env.SESSION_SECRET || 'mi-clave-secreta',
  resave: false,
  saveUninitialized: false
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', authRoutes);
app.use('/', productRoutes);
app.use('/api', productApiRoutes);


dbConnecction();


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
