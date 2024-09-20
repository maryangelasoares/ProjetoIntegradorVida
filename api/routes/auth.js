const jwt = require('jsonwebtoken');

const autenticarUsuario = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Autenticação necessária' });
  }

  try {
    const decoded = jwt.verify(token, 'seuSegredoJWT');
    req.usuario = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Autenticação inválida' });
  }
};

module.exports = autenticarUsuario;
