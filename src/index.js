const Post = require('./post/post.model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const yup = require('yup');
let posts = [];

const addPost = (post) => {
  const validation = yup.object().shape({
    'title': yup.string().required('Title is required'),
    'content': yup.string().required('Content is required')
  });
  return validation.validate(post, {'abortEarly': false});
};

const getPostById = (postId) => {
  const post = posts.find(post => post.id === postId);

  if (!post) {
    return Promise.reject('This post does not exist');
  }

  return Promise.resolve(post);
};

const removePost = (postId) => {
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex < 0) {
    return Promise.reject('This post does not exist');
  }

  posts = posts.filter(post => post.id !== postId);

  return Promise.resolve();
};

const getPosts = () => {
  return Promise.resolve(posts);
};

app.use(bodyParser.json());

app.post('/posts', (req, res, next) => {
  addPost(req.body)
    .then((post) => {
      post = Post.fromRequestBody(post);
      posts.push(post.toJSON());
      res
        .status(201)
        .json({
          message: 'Post created',
          payload: post.toJSON()
        })
    })
    .catch((error) => {
      console.log(error);
      res.error = {'status': 500, 'message': error.errors};
      next();
    })
});

app.get('/posts', (req, res, next) => {
  getPosts()
    .then((posts) => {
      res
        .status(201)
        .json({
          payload: posts
        })
    })
    .catch((error) => {
      res.error = {'status': 500, 'message': error};
      next();
    })
});

app.get('/posts/:postId', (req, res, next) => {
  getPostById(req.params.postId)
    .then((post) => {
      res
        .status(200)
        .json({
          payload: post.toJSON()
        })
    })
    .catch((error) => {
      res.error = {'status': 500, 'message': error};
      next();
    })
});

app.delete('/posts/:postId', (req, res, next) => {
  removePost(req.params.postId)
    .then(() => {
      res
        .status(204)
        .json({
          message: 'Post removed'
        })
    })
    .catch((error) => {
      res.error = {'status': 500, 'message': error};
      next();
    })
});

app.use((req, res) => {
  if (!!res.error) {
    res
      .status(res.error.status)
      .json({
        'error': 'Error occuried',
        'status': res.error.status,
        'message': res.error.message
      })
    return;
  }
  res
    .status(404)
    .json({
      'error': 'Not Found',
      'status': 404,
      'message': ''
    });
  return;
})

module.exports = app;