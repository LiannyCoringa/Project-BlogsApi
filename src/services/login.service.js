const { User } = require('../models');
const generateToken = require('../utils/token');

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email, password },
    attributes: { exclude: ['password', 'email'] },
  });
  if (!user) {
    return { status: 400, data: { message: 'Invalid fields' } };
  }
  const { id } = user.dataValues;
  const token = generateToken.generateToken({ id });
  return { status: 200, data: { token } };
};

module.exports = {
  login,
};