function getEditProductForm(product, categories, sizes) {
  return `
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

      <form action="/dashboard/${product._id}?_method=PUT" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_method" value="PUT" />

        <label>Nombre:
          <input type="text" name="name" value="${product.name}" required />
        </label>

        <label>Descripción:
          <textarea name="description">${product.description || ''}</textarea>
        </label>

        <label>Imagen (URL actual):
          <input type="text" name="imageUrl" value="${product.image || ''}" />
        </label>

        <label>O Subir nueva imagen:
          <input type="file" name="image" accept="image/*" />
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
}

module.exports = getEditProductForm;


