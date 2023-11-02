const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  function extractToken(bearerToken) {
    return bearerToken.split(' ')[1];
  }

  if (!authorization || authorization === '') {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = extractToken(authorization);
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = auth;