function getNavBar(isAdmin = false) {
  return `
    <header>
      <div>Mi Tienda</div>
      <nav>
        <a href="/products">Todos</a>
        <a href="/products?cat=camisetas">Camisetas</a>
        <a href="/products?cat=pantalones">Pantalones</a>
        <a href="/products?cat=zapatos">Zapatos</a>
        <a href="/products?cat=accesorios">Accesorios</a>
        ${isAdmin ? '<a href="/dashboard/new">Nuevo Producto</a>' : '<a href="/login">Login</a>'}
      </nav>
    </header>
  `;
}

module.exports = getNavBar;