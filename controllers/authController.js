require('dotenv').config();

const showLogin = (req, res) => {
  const error = req.query.error
    ? `<p style="color:red;">${req.query.error}</p>`
    : '';

  const form = `
    <h2>Login administrador</h2>
    ${error}
    <form method="POST" action="/login">
      <label>Usuario:</label><input name="username" /><br/>
      <label>Contraseña:</label><input type="password" name="password" /><br/>
      <button>Entrar</button>
    </form>
  `;
  res.send(form);
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    req.session.isAuthenticated = true;
    res.redirect('/dashboard');
  } else {
    res.redirect('/login?error=Credenciales inválidas');
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

module.exports = { showLogin, login, logout};