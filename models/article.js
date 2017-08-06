const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  text: String,
  img: String,
  date: {type: Date, default: Date.now}
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
