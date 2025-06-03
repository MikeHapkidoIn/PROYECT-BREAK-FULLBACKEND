function baseHtml(content) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Mi Tienda</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        header {
          background-color: #222;
          color: white;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        nav a {
          color: white;
          text-decoration: none;
          margin: 0 10px;
        }
        .container {
          padding: 20px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .product-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          text-align: center;
        }
        .product-card img {
          max-width: 100%;
          height: auto;
          border-radius: 5px;
        }
        .btn {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          margin-top: 10px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `;
}

module.exports = baseHtml;

