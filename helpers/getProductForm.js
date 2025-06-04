function getProductForm(categories, sizes) {
  return `
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

      <form action="/dashboard" method="POST" enctype="multipart/form-data">
      
        <label>Nombre:
          <input type="text" name="name" required />
        </label>

        <label>Descripción:
          <textarea name="description"></textarea>
        </label>

        <label>Imagen:
          <input type="file" name="image" accept="image/*"required/>
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
}

module.exports = getProductForm;