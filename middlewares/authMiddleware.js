module.exports = function requireAuth(req, res, next) {
  // Si hay sesión y está autenticado, continua
  if (req.session && req.session.isAuthenticated) {
    return next();
  }

  // Si no está autenticado, redirige al login
  res.redirect('/login?error=Acceso denegado');
};


  
