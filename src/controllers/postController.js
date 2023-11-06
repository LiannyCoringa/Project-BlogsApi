const postService = require('../services/post.service');

const create = async (req, res) => {
  const newPost = req.body;
  const { id } = req.user;
  const { status, data } = await postService.create(newPost, id);

  return res.status(status).json(data);
};

const findAll = async (_req, res) => {
  const { status, data } = await postService.findAll();

  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
};