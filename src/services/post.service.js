const { BlogPost, Category, PostCategory, User } = require('../models');

const validateCategory = (categoryIds) => {
  const valid = categoryIds.every((categoryId) =>
    Category.findByPk(categoryId));
  return valid;
};

const create = async (newPost, id) => {
  try {
    const { title, content, categoryIds } = newPost;
    const newPost1 = { title, content, userId: id, published: new Date(), updated: new Date() };
    validateCategory(categoryIds);

    const post = await BlogPost.create(newPost1);
    const postId = post.id;

    const promises = categoryIds.map((categoryId) =>
      PostCategory.create({ postId, categoryId }));
    await Promise.all(promises);
    return { status: 201, data: post };
  } catch (error) {
    return { status: 400, data: { message: 'one or more "categoryIds" not found' } };
  }
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return { status: 200, data: posts };
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  if (!post) return { status: 404, data: { message: 'Post does not exist' } };
  return { status: 200, data: post };
};

const update = async (id, title, content, userId) => {
  const { data } = await findById(id);
  if (data.userId !== userId) return { status: 401, data: { message: 'Unauthorized user' } };
  await BlogPost.update({ title, content }, { where: { id } });
  const newPost = await findById(id);
  return newPost;
};

const exclude = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { status: 404, data: { message: 'Post does not exist' } };
  if (post.userId !== userId) return { status: 401, data: { message: 'Unauthorized user' } };
  await BlogPost.destroy({ where: { id } });
  return { status: 204, data: {} };
};

const search = async (q) => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  const filteredPosts = posts.filter((postFilter) =>
    postFilter.title.includes(q) || postFilter.content.includes(q));
  return { status: 200, data: filteredPosts };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  exclude,
  search,
};