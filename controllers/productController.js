const { Product, sizes, categories } = require('../models/Product');
//const getNavBar = require('../helpers/getNavBar');
//const getProductCards = require('../helpers/getProductCards');
//const baseHtml = require('../helpers/baseHtml');


const productController = {
  showProducts: async (req, res) => {
  try {
    const category = req.query.cat;
    const products = category
      ? await Product.find({ category })
      : await Product.find();

    const isAdmin = req.originalUrl.startsWith('/dashboard');

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Productos</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
          header {
            background-color: #222;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          nav a {
            color: white;
            text-decoration: none;
            margin: 0 10px;
          }
          .container {
            padding: 20px;
          }
          .product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }
          .product-card {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          .product-card img {
            max-width: 100%;
            height: auto;
            border-radius: 5px;
          }
          .btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <header>
          <div>Mi Tienda</div>
          <nav>
            <a href="/products">Todos</a>
            <a href="/products?cat=remeras">Remeras</a>
            <a href="/products?cat=pantalones">Pantalones</a>
            <a href="/products?cat=zapatillas">Zapatillas</a>
            <a href="/products?cat=accesorios">Accesorios</a>
            <a href="/login">Login</a>
          </nav>
        </header>
        <div class="container">
          <h1>Productos</h1>
          <div class="product-grid">
            ${products.map(product => `
              <div class="product-card">
                <h3>${product.name}</h3>
                ${product.image ? `<img src="${product.image}" alt="${product.name}" />` : ''}
                <a class="btn" href="${isAdmin ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
              </div>
            `).join('')}
          </div>
        </div>
      </body>
      </html>
    `;

    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar productos');
  }
},
  showProductById: async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    const isAdmin = req.originalUrl.startsWith('/dashboard');

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${product.name}</title>
        <style>
          body { font-family: Arial; text-align: center; margin: 2rem; }
          img { width: 250px; border-radius: 10px; }
          .admin-btns { margin-top: 1rem; }
          .admin-btns a, .admin-btns form {
            display: inline-block;
            margin: 0 5px;
          }
          button {
            background-color: red;
            color: white;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 5px;
          }
          a.edit {
            background-color: orange;
            padding: 6px 12px;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}" />
        <p>${product.description}</p>
        <p><strong>${product.price} €</strong></p>
        <p>Categoría: ${product.category}</p>
        <p><strong>Talla:</strong> ${product.size}</p>

        ${isAdmin ? `
          <div class="admin-btns">
            <a href="/dashboard/${product._id}/edit" class="edit">Editar</a>
            <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST">
            <button type="submit">Eliminar</button>
            </form>
           
          </div>
        ` : ''}
      </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error al cargar el producto:', error);
    res.status(500).send('Error al cargar el producto');
  }
},

  createProduct: async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;

    // Validar que category esté en las categorías permitidas
    if (!categories.includes(category)) {
      return res.status(400).send('Categoría no válida');
    }

    // (Opcional) Validar que sizes esté en la lista de talles permitidos
    if (size && !sizes.includes(size)) {
      return res.status(400).send('Talle no válido');
    }

    const newProduct = new Product({
      name,
      description,
      image,
      category,
      size,
      price
    });

    await newProduct.save();

    // Redirigir a detalle o listado
    res.redirect(`/dashboard/${newProduct._id}`);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).send('Error al crear el producto');
  }
},

showNewProduct: (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <title>Nuevo Producto</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        label { display: block; margin-top: 10px; }
        input, select, textarea { width: 300px; padding: 5px; margin-top: 5px; }
        button { margin-top: 15px; padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
        button:hover { background-color: #0056b3; }
      </style>
    </head>
    <body>
      <h1>Nuevo Producto</h1>
      <form action="/dashboard/products/create" method="POST">
        <label>Nombre:
          <input type="text" name="name" required />
        </label>
        <label>Descripción:
          <textarea name="description"></textarea>
        </label>
        <label>Imagen (URL):
          <input type="text" name="image" />
        </label>
        <label>Categoría:
          <select name="category" required>
            <option value="">Selecciona una categoría</option>
            ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
          </select>
        </label>
        <label>Talle:
          <select name="size">
            <option value="">Selecciona un talle</option>
            ${sizes.map(t => `<option value="${t}">${t}</option>`).join('')}
          </select>
        </label>
        <label>Precio:
          <input type="number" name="price" min="0" step="0.01" required />
        </label>
        <button type="submit">Crear Producto</button>
      </form>
    </body>
    </html>
  `;

  res.send(html);
},
  showEditProduct: async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Editar Producto</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          label { display: block; margin-top: 10px; }
          input, select, textarea { width: 300px; padding: 5px; margin-top: 5px; }
          button { margin-top: 15px; padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; }
          button:hover { background-color: #0056b3; }
        </style>
      </head>
      <body>
        <h1>Editar Producto</h1>
        <form action="/dashboard/${product._id}" method="POST">
          <input type="hidden" name="_method" value="PUT" />
          <label>Nombre:
            <input type="text" name="name" value="${product.name}" required />
          </label>
          <label>Descripción:
            <textarea name="description">${product.description || ''}</textarea>
          </label>
          <label>Imagen (URL):
            <input type="text" name="image" value="${product.image || ''}" />
          </label>
          <label>Categoría:
            <select name="category" required>
              <option value="">Selecciona una categoría</option>
              ${categories.map(cat => `
                <option value="${cat}" ${cat === product.category ? 'selected' : ''}>${cat}</option>
              `).join('')}
            </select>
          </label>
          <label>Talle:
            <select name="size">
              <option value="">Selecciona un talle</option>
              ${sizes.map(t => `
                <option value="${t}" ${t === product.size ? 'selected' : ''}>${t}</option>
              `).join('')}
            </select>
          </label>
          <label>Precio:
            <input type="number" name="price" min="0" step="0.01" value="${product.price || 0}" required />
          </label>
          <button type="submit">Guardar Cambios</button>
        </form>
      </body>
      </html>
    `;

    res.send(html);

  } catch (error) {
    console.error('Error al cargar producto para editar:', error);
    res.status(500).send('Error al cargar producto');
  }
},

 updateProduct: async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, image, category, size, price } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, image, category, size, price },
      { new: true } // devuelve el producto actualizado
    );

    if (!updatedProduct) {
      return res.status(404).send('Producto no encontrado');
    }

    // Redirige a la vista de todos los productos del dashboard:
    res.redirect('/dashboard');

    // Si preferís redirigir al detalle del producto:
    // res.redirect(`/dashboard/productos/${updatedProduct._id}`);

  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).send('Error al actualizar producto');
  }
},
  deleteProduct: async (req, res) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return res.status(404).send('Producto no encontrado');
    }

    // Redirige al listado de productos del dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).send('Error al eliminar producto');
  }
}
};

module.exports = productController;


//const Product = require('../models/Product');

/* crea un nuevo producto y guarda la imagen de Cloudinary
exports.createProduct = async (req, res) => {
  try {
    const { name, category } = req.body;
    const imageUrl = req.file?.path; // cloudinary sube la imagen y nos da la url

    const newProduct = new Product({ name, category, image: imageUrl });
    await newProduct.save();

    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).send('Error al crear producto');
  }
};
*/