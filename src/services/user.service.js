const { User } = require('../models');
const generateToken = require('../utils/token');

const create = async ({ displayName, email, password, image }) => {
  const getByEmail = await User.findOne({
    where: { email },
    attributes: { exclude: ['password', 'email'] },
  });

  if (getByEmail) {
    return { status: 409, data: { message: 'User already registered' } };
  }

  const regex = /^\S+@\S+\.\S+$/;
  if (regex.test(email) === false) {
    return { status: 400, data: { message: '"email" must be a valid email' } };
  }

  const user = await User.create({ displayName, email, password, image });
  const { id } = user.dataValues;
  const token = generateToken.generateToken({ id });
  return { status: 201, data: { token } };
};

const findAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { status: 200, data: users };
};

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return { status: 404, data: { message: 'User does not exist' } };
  }

  return { status: 200, data: user };
};

module.exports = {
  create,
  findAll,
  findById,
};