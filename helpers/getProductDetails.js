// helpers/getProductDetail.js
function getProductDetail(product, isAdmin) {
  return `
    <div class="container" style="text-align: center; margin: 2rem;">
      <h1>${product.name}</h1>
      ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 250px; border-radius: 10px;" />` : ''}
      <p>${product.description}</p>
      <p><strong>${product.price} €</strong></p>
      <p>Categoría: ${product.category}</p>
      <p><strong>Talla:</strong> ${product.size}</p>

      ${isAdmin ? `
        <div class="admin-btns" style="margin-top: 1rem;">
          <a href="/dashboard/${product._id}/edit" style="background-color: orange; padding: 6px 12px; color: white; text-decoration: none; border-radius: 5px;">Editar</a>
          <form action="/dashboard/${product._id}/delete?_method=DELETE" method="POST" style="display: inline-block;">
            <button type="submit" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px;">Eliminar</button>
          </form>
        </div>
      ` : ''}
    </div>
  `;
}

module.exports = getProductDetail;

