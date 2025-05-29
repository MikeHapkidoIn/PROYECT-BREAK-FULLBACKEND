const { Product, sizes, categories } = require('../models/Product');
const getNavBar = require('../helpers/getNavBar');
const getProductCards = require('../helpers/getProductCards');
const baseHtml = require('../helpers/baseHtml');

const productController = {
    
showProducts: async (req, res) => {
  try {
    const products = await Product.find();
    const html = `
      <html>
        ${baseHtml()}
        <body>
          ${getNavBar(false)}
          <h1>Catálogo de productos</h1>
          ${getProductCards(products)}
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
},

showProductById: async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const html = `
      <html>
        ${baseHtml()}
        <body>
          ${getNavBar(false)}
          <h1>${product.name}</h1>
          <img src="${product.image}" alt="${product.name}">
          <p>${product.description}</p>
          <p>Precio: ${product.price}€</p>
          <p>Categoría: ${product.category}</p>
          <p>Talla: ${product.size}</p>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error al cargar producto');
  }
},

showDashboard: async (req, res) => {
  try {
    const products = await Product.find();
    const html = `
      <html>
        ${baseHtml()}
        <body>
          ${getNavBar(true)}
          <h1>Dashboard de administración</h1>
          ${getProductCards(products, true)}
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error al cargar dashboard');
  }
},

showNewProductForm: (req, res) => {
  const html = `
    <html>
      ${baseHtml()}
      <body>
        ${getNavBar(true)}
        <h1>Nuevo producto</h1>
        <form action="/dashboard" method="POST">
          <input type="text" name="name" placeholder="Nombre" required />
          <textarea name="description" placeholder="Descripción" required></textarea>
          <input type="text" name="image" placeholder="URL de imagen" required />
          <select name="category" required>
            <option value="">Categoría</option>
            <option value="Camisetas">Camisetas</option>
            <option value="Pantalones">Pantalones</option>
            <option value="Zapatos">Zapatos</option>
            <option value="Accesorios">Accesorios</option>
          </select>
          <select name="size" required>
            <option value="">Talla</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
          <input type="number" step="0.01" name="price" placeholder="Precio" required />
          <button type="submit">Crear producto</button>
        </form>
      </body>
    </html>
  `;
  res.send(html);
},

createProduct: async (req, res) => {
  try {
    const { name, description, image, category, size, price } = req.body;
    const newProduct = new Product({ name, description, image, category, size, price });
    await newProduct.save();
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error al crear producto');
  }
},

showEditProductForm: async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    const html = `
      <html>
        ${baseHtml()}
        <body>
          ${getNavBar(true)}
          <h1>Editar producto</h1>
          <form action="/dashboard/${product._id}?_method=PUT" method="POST">
            <input type="text" name="name" value="${product.name}" required />
            <textarea name="description" required>${product.description}</textarea>
            <input type="text" name="image" value="${product.image}" required />
            <select name="category" required>
              <option value="Camisetas" ${product.category === 'Camisetas' ? 'selected' : ''}>Camisetas</option>
              <option value="Pantalones" ${product.category === 'Pantalones' ? 'selected' : ''}>Pantalones</option>
              <option value="Zapatos" ${product.category === 'Zapatos' ? 'selected' : ''}>Zapatos</option>
              <option value="Accesorios" ${product.category === 'Accesorios' ? 'selected' : ''}>Accesorios</option>
            </select>
            <select name="size" required>
              <option value="XS" ${product.size === 'XS' ? 'selected' : ''}>XS</option>
              <option value="S" ${product.size === 'S' ? 'selected' : ''}>S</option>
              <option value="M" ${product.size === 'M' ? 'selected' : ''}>M</option>
              <option value="L" ${product.size === 'L' ? 'selected' : ''}>L</option>
              <option value="XL" ${product.size === 'XL' ? 'selected' : ''}>XL</option>
            </select>
            <input type="number" step="0.01" name="price" value="${product.price}" required />
            <button type="submit">Actualizar producto</button>
          </form>
        </body>
      </html>
    `;
    res.send(html);
  } catch (error) {
    res.status(500).send('Error al cargar formulario de edición');
  }
},

updateProduct: async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, image, category, size, price } = req.body;
    await Product.findByIdAndUpdate(productId, { name, description, image, category, size, price });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error al actualizar producto');
  }
},

deleteProduct: async (req, res) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndDelete(productId);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).send('Error al eliminar producto');
  }
}

}

module.exports = productController;


