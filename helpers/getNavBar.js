const { categories } = require('../models/Product');

function getNavBar() {
  const categoriasHtml = categories.map(cat => `
    <li><a href="/products?categories=${encodeURIComponent(cat)}">${cat}</a></li>
  `).join('');

  return `
    <nav>
      <ul>
        <li><a href="/">Inicio</a></li>
        <li>
          <a href="/products">Productos</a>
          <ul class="submenu">
            ${categoriasHtml}
            <li><a href="/products">Todas</a></li>
          </ul>
        </li>
        <li><a href="/dashboard">Admin</a></li>
      </ul>
    </nav>
  `;
}

module.exports = getNavBar;