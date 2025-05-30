/*function getNavBar(isDashboard = false) {
  // Definimos las categorías de ejemplo
  const categories = ['home','Camisetas', 'Pantalon', 'Zapatillas', 'Accesorios', 'Login'];

  // Creamos los enlaces de categorías
  let categoryLinks = categories.map(category => 
    `<a href="/products?category=${encodeURIComponent(category)}">${category}</a>`
  ).join(' | ');

  // Si estamos en el dashboard, añadimos un enlace extra para subir producto nuevo
  let dashboardLink = '';
  if (isDashboard) {
    dashboardLink = ` | <a href="/dashboard/new">Subir nuevo producto</a>`;
  }

  // Armamos el HTML completo de la barra de navegación
  return `
    <nav>
      ${categoryLinks}
      ${dashboardLink}
    </nav>
  `;
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