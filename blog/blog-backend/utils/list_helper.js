const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0); // <--- Crucial: 0 is the starting value for 'sum'
};

module.exports = {
  dummy,
  totalLikes,
};
