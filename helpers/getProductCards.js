function getProductCards(products, isAdmin = false) {
  return `
    <div class="product-grid">
      ${products.map(product => `
        <div class="product-card">
          <h3>${product.name}</h3>
          ${product.image ? `<img src="${product.image}" alt="${product.name}" />` : ''}
          <a class="btn" href="${isAdmin ? `/dashboard/${product._id}` : `/products/${product._id}`}">Ver detalle</a>
        </div>
      `).join('')}
    </div>
  `;
}

module.exports = getProductCards;