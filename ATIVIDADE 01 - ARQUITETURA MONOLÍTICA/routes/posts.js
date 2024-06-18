const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const postsFilePath = path.join(__dirname, '../data/posts.json');


const getPosts = () => {
  const data = fs.readFileSync(postsFilePath, 'utf8');
  return JSON.parse(data);
};


const savePosts = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
};


router.get('/', (req, res) => {
  const posts = getPosts();
  res.render('index', { posts });
});


router.get('/new', (req, res) => {
  res.render('new_post');
});


router.post('/new', (req, res) => {
  const posts = getPosts();
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    body: req.body.body,
  };
  posts.push(newPost);
  savePosts(posts);
  res.redirect('/');
});


router.get('/edit/:id', (req, res) => {
  const posts = getPosts();
  const post = posts.find(p => p.id == req.params.id);
  res.render('edit_post', { post });
});


router.post('/edit/:id', (req, res) => {
  const posts = getPosts();
  const index = posts.findIndex(p => p.id == req.params.id);
  posts[index].title = req.body.title;
  posts[index].body = req.body.body;
  savePosts(posts);
  res.redirect('/');
});


router.post('/delete/:id', (req, res) => {
  let posts = getPosts();
  posts = posts.filter(p => p.id != req.params.id);
  savePosts(posts);
  res.redirect('/');
});

module.exports = router;
