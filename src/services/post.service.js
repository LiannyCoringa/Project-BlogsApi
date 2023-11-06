const { BlogPost, Category, PostCategory } = require('../models');

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

module.exports = {
  create,
};