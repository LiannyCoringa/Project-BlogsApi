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

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.findById(id);

  return res.status(status).json(data);
};

const update = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { title, content } = req.body;
  const { status, data } = await postService.update(id, title, content, userId);

  return res.status(status).json(data);
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};