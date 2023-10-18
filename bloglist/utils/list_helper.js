const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  const total = likes.reduce((sum, next) => {
    return sum + next;
  }, 0);

  return blogs.length === 0 ? 0 : total;
};
const favBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);
  let maxlike = Math.max(...likes);
  //   let fav = likes.forEach((like) => {
  //     if (like >= maxlike) {
  //       maxlike = like;
  //     }
  //   });
  const favblog = blogs.find((blog) => blog.likes === maxlike);

  return blogs.length === 0 ? 0 : favblog;
};

module.exports = { dummy, totalLikes, favBlog };
