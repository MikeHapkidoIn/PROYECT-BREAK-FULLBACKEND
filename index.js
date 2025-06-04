const express = require('express');
const app = express();
require('dotenv').config();
const dbConnecction = require('./config/db.js');
const productRoutes = require('./routes/productRoutes');
const methodOverride = require('method-override');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const productApiRoutes = require('./routes/productApiRoutes');
const PORT = process.env.PORT;


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




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', productRoutes);
app.use('/api', productApiRoutes);


dbConnecction();


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
