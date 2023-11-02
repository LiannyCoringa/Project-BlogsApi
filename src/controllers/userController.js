const userService = require('../services/user.service');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await userService.create({ displayName, email, password, image });

  return res.status(status).json(data);
};

const findAll = async (_req, res) => {
  const { status, data } = await userService.findAll();

  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
};