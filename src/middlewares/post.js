const post = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (title === undefined || content === undefined || categoryIds === undefined) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = post;