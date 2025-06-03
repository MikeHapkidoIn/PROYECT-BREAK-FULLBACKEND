function baseHtml({ title, navBar, content }) {
  return `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        ${navBar}
        <main>
          ${content}
        </main>
      </body>
    </html>
  `;
}

module.exports = baseHtml;