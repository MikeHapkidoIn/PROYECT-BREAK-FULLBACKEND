function getProductCards(productos) {
  return productos.map(producto => `
    <article class="card">
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h2>${producto.nombre}</h2>
      <p>Precio: $${producto.precio}</p>
      <p>Categoría: ${producto.categoria}</p>
    </article>
  `).join('');
}

module.exports = getProductCards;