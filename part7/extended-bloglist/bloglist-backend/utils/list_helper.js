const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return array.length === 0 ? 0 : array.reduce(reducer, 0);
};

const favoriteBlog = (array) => {
  const likes = array.map((item) => item.likes);
  const maxLikes = Math.max(...likes);
  const maxLikesBlog = array.find((item) => item.likes === maxLikes);
  return {
    title: maxLikesBlog.title,
    author: maxLikesBlog.author,
    likes: maxLikesBlog.likes,
  };
};

const mostBlogs = (array) => {
  const authors = _.map(array, (n) => {
    return { author: n.author };
  });
  const groupedAuthors = _.groupBy(authors, "author");
  const blogCount = _.map(groupedAuthors, (n) => {
    const uniqueName = _.sample(n);
    return {
      author: uniqueName.author,
      blogs: n.length,
    };
  });
  return _.maxBy(blogCount, "blogs");
};

const mostLikes = (array) => {
  const authors = _.map(array, (n) => {
    return { author: n.author, likes: n.likes };
  });
  const groupedAuthors = _.groupBy(authors, "author");
  const likesCount = _.map(groupedAuthors, (n) => {
    const uniqueName = _.sample(n);
    const sum = (total, n) => {
      return total + n.likes;
    };
    const sumLikes = _.reduce(n, sum, 0);
    return {
      author: uniqueName.author,
      likes: sumLikes,
    };
  });

  return _.maxBy(likesCount, "likes");
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
