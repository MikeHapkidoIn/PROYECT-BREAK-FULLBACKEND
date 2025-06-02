/* 
function getNavbar(isAdmin = false) {
  const categories = require ('../models/Produtc.js);

  let navbar = `
    <nav style="margin-bottom: 2rem;">
      <a href="/getproducts">Home</a> | 
  `;

  categories.forEach(cat => {
    navbar += `<a href="/getproducts?category=${encodeURIComponent(cat)}">${cat}</a> | `;
  });

  // Login siempre visible
  navbar += `<a href="/login">Login</a>`;

  // "Nuevo producto" solo si es admin
  if (isAdmin) {
    navbar += ` | <a href="/dashboard/products/create">Nuevo producto</a>`;
  }

  navbar += `</nav>`;

  return navbar;
}

module.exports = getNavBar;*/
module.exports = function getNavBar() {
  return `
    <nav>
      <a href="/">Inicio</a>
      <a href="/camisetas">Camisetas</a>
      <a href="/pantalones">Pantalones</a>
      <a href="/zapatillas">Zapatillas</a>
      <a href="/accessorios">Accesorios</a>
      <a href="/dashboard">Dashboard</a>
      <a href="/">Login</a>
    </nav>     
  `;
};
/*import { categories } from './enums.js';

const generateNavbar = () => {
  return `
    <nav>
      ${categories.map(cat => `<a href="/productos/categoria/${cat}">${cat}</a>`).join(" | ")}
    </nav>
  `;
}; */