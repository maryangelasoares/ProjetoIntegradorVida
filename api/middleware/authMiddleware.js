const autenticarUsuario = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Autenticação necessária' });
  }

  try {
    const decoded = jwt.verify(token, segredoJWT);
    req.usuario = decoded;
    next();
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Sessão expirada, faça login novamente' });
    } else {
      return res.status(401).json({ message: 'Token inválido' });
    }
  }
};

module.exports = autenticarUsuario;
