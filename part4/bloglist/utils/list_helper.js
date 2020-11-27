const dummy = (blogs) => {
  return 1
}
  

const totalLikes = array => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  
  return array.length === 0
      ? 0
      : array.reduce(reducer, 0)
}

const favoriteBlog = array => {
  const likes = array.map(item => item.likes)
  const maxLikes = Math.max(...likes)

  return array.find(item => item.likes === maxLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}