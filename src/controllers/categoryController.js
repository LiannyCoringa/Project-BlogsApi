const categoryService = require('../services/category.service');

const create = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.create({ name });

  return res.status(status).json(data);
};

const findAll = async (_req, res) => {
  const { status, data } = await categoryService.findAll();

  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
};