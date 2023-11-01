const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const generateToken = (payload) => jwt.sign(payload, JWT_SECRET);

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: { exclude: ['password', 'email'] },
  });
  if (!user) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }
  const { displayName, image, id } = user.dataValues;
  const token = generateToken({ displayName, image, id });
  return { status: 200, data: { token } };
};

module.exports = {
  login,
};