// productController.test.js
const request = require('supertest');
const app = require('../index');

// Mock del modelo Product
jest.mock('../models/Product', () => ({
  create: jest.fn()
}));
const Product = require('../models/Product');

describe('POST /products', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('responde 201 con el producto creado', async () => {
    const body = {
      name: 'Remera',
      description: 'Una remera cómoda',
      image: 'http://imagen.com/remera.jpg',
      category: 'mujer',
      size: 'M',
      price: 25
    };

    const fakeDoc = { _id: 'abc123', ...body };
    Product.create.mockResolvedValue(fakeDoc);

    const res = await request(app).post('/products').send(body);

    expect(res.status).toBe(201);
    expect(res.body).toEqual(fakeDoc);
  });

  it('devuelve 400 si falta el nombre', async () => {
    const body = {
      description: 'Sin nombre',
      image: 'http://imagen.com/item.jpg',
      category: 'hombre',
      size: 'L',
      price: 30
    };

    const res = await request(app).post('/products').send(body);

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Faltan campos obligatorios' });
  });

  it('devuelve 500 si hay error al crear el producto', async () => {
    const body = {
      name: 'Remera',
      description: 'Error forzado',
      image: 'http://imagen.com/remera.jpg',
      category: 'mujer',
      size: 'M',
      price: 25
    };

    Product.create.mockRejectedValue(new Error('Error de base de datos'));

    const res = await request(app).post('/products').send(body);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});

describe('POST /dashboard', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve 302 y redirige al detalle del producto si la creación es exitosa', async () => {
    const body = {
      name: 'Pantalón',
      description: 'Un pantalón de jean',
      image: 'http://imagen.com/pantalon.jpg',
      category: 'hombre',
      size: 'L',
      price: 45
    };

    const fakeDoc = { _id: 'abc123', ...body };
    Product.create.mockResolvedValue(fakeDoc);

    const res = await request(app).post('/dashboard').send(body);

    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/dashboard/abc123');
  });

  it('devuelve 400 si la categoría no es válida', async () => {
    const body = {
      name: 'Gorra',
      description: 'Una gorra azul',
      image: 'http://imagen.com/gorra.jpg',
      category: 'animales', // inválida
      size: 'M',
      price: 15
    };

    const res = await request(app).post('/dashboard').send(body);

    expect(res.status).toBe(400);
    expect(res.text).toBe('Categoría no válida');
  });

  it('devuelve 400 si el talle no es válido', async () => {
    const body = {
      name: 'Producto inválido',
      category: 'mujer',  // categoría válida para que el test se enfoque solo en talle
      size: 'gigante', // talle inválido
      price: 1000,
      description: 'Descripción prueba',
      image: 'https://example.com/image.jpg',
    };

    const res = await request(app).post('/dashboard').send(body);

    expect(res.status).toBe(400);
    expect(res.text).toContain('Talle inválido');
  });
});
