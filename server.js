const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Article = require('./models/article');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/customizr', {
  useMongoClient: true
});

app.get('/api/articles', (req, res) => {
  Article.find().then((article) => {
    res.json(article);
  });
});

app.post('/api/articles', (req, res) => {
  Article.create({
    title: req.body.title,
    text: req.body.text,
    img: req.body.img
  }).then((article) => {
    res.json(article);
  });
});

app.get('/api/articles/:id', (req, res) => {
  Article.findById(req.params.id).then((article) => {
    res.json(article);
  }).catch(() => res.json("Couldn't find this article"))
});

app.put('/api/articles/:id', (req, res) => {
  Article.findOneAndUpdate({
    title: req.body.title,
    text: req.body.text,
    img: req.body.img
  }).then((article) => {
    res.json(article);
  })
})

app.delete('/api/articles/:id', (req, res) => {
  Article.findOneAndRemove().then((article) => res.json(article));
})

app.listen(27017, () => {
  console.log('Listening on port 27017!')
});
