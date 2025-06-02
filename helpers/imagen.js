function getNewProductForm() {
  return `
    <form action="/dashboard" method="POST" enctype="multipart/form-data">
      <input type="text" name="name" placeholder="Nombre del producto" required />
      <input type="text" name="category" placeholder="Categoría" required />
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Subir</button>
      <h1><%= product.name %></h1>
<p>Categoría: <%= product.category %></p>
<img src="<%= product.image %>" alt="Imagen del producto" style="max-width: 300px;" />
    </form>
  `;
}

module.exports = getNewProductForm;