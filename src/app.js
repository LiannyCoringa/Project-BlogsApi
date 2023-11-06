const express = require('express');
const loginController = require('./controllers/login');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const postController = require('./controllers/postController');
const loginMiddleware = require('./middlewares/login');
const userMiddleware = require('./middlewares/user');
const auth = require('./middlewares/auth');
const category = require('./middlewares/category');
const post = require('./middlewares/post');
const postPut = require('./middlewares/postPut');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginMiddleware, loginController.login);

app.get('/user', auth, userController.findAll);
app.post('/user', userMiddleware, userController.create);

app.get('/user/:id', auth, userController.findById);

app.get('/categories', auth, categoryController.findAll);
app.post('/categories', auth, category, categoryController.create);

app.get('/post', auth, postController.findAll);
app.post('/post', auth, post, postController.create);

app.get('/post/:id', auth, postController.findById);
app.put('/post/:id', auth, postPut, postController.update);
app.delete('/post/:id', auth, postController.exclude);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
