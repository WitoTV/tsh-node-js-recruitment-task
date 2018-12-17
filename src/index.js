const Post = require('./post/post.model');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let posts = [];

const addPost = (post) => {
  posts.push(post);
  return Promise.resolve(post)
};

const getPostById = (postId) => {
  const post = posts.find(post => post.id === postId);

  if (!post) {
    return Promise.reject('Error occurred');
  }

  return Promise.resolve(post);
};

const removePost = (postId) => {
  const postIndex = posts.findIndex(post => post.id === postId);

  if (postIndex < 0) {
    return Promise.reject('Error occurred');
  }

  posts = posts.filter(post => post.id !== postId);

  return Promise.resolve();
};

const getPosts = () => {
  return Promise.resolve(posts);
};

app.use(bodyParser.json());

app.post('/posts', function(req, res) {
  addPost(Post.fromRequestBody(req.body))
    .then(post => {
      res
        .status(201)
        .json({
          message: 'Post created',
          payload: post.toJSON()
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.get('/posts', function(req, res) {
  getPosts()
    .then((posts) => {
      res
        .status(201)
        .json({
          payload: posts
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.get('/posts/:postId', function(req, res) {
  getPostById(req.params.postId)
    .then((post) => {
      res
        .status(200)
        .json({
          payload: post.toJSON()
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

app.delete('/posts/:postId', function(req, res) {
  removePost(req.params.postId)
    .then(() => {
      res
        .status(204)
        .json({
          message: 'Post removed'
        })
    })
    .catch(error => {
      res
        .status(500)
        .json({ error });
    })
});

module.exports = app;