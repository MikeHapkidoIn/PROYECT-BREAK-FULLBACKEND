function renderPage({ navbar, content }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Mi tienda</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        ${navbar}
        <main>
          ${content}
        </main>
      </body>
    </html>
  `;
};

module.exports = renderPage;