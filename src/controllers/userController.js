const userService = require('../services/user.service');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const token = await userService.create({ displayName, email, password, image });

  return res.status(token.status).json(token.data);
};

module.exports = {
  create,
};