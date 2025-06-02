const request = require('supertest');
const express = require('express');
const productRoutes = require('../routes/productRoutes');

const app = express();
app.use(express.json());
app.use('/', productRoutes);

describe('Product routes', () => {
  it('GET /products debería responder con 200 y HTML', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<html');  // puedes chequear partes del HTML
  });

  it('GET /products/:productId debería devolver producto o 404', async () => {
    const fakeId = '64f123456789abcdef123456'; // pon un ID válido de MongoDB si tienes o uno random para 404
    const res = await request(app).get(`/products/${fakeId}`);
    // Puede ser 200 o 404 según exista o no el producto
    expect([200, 404]).toContain(res.statusCode);
  });

  // Puedes agregar tests para POST, PUT y DELETE simulando envío de datos
});