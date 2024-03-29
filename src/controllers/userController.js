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

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.findById(id);

  return res.status(status).json(data);
};

const exclude = async (req, res) => {
  const { id } = req.user;
  const { status, data } = await userService.exclude(id);

  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
  findById,
  exclude,
};