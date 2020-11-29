const _ = require('lodash')

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
const mostBlogs = array => {
  const authors = array.map((blog) => blog.author)
const uniqueAuthors = authors.filter((author, index) => authors.indexOf(author) === index)
const blogCount = uniqueAuthors.map(author => {
    return {
        "name": author,
        "blogs": 0
    }
})

for (var j = 0; j < blogCount.length; j++){
   for (var k = 0; k < authors.length; k++){
       if (blogCount[j].name === authors[k]){
           blogCount[j].blogs ++
       }
   }
}

const count = Math.max(...blogCount.map(value => value.blogs))
const maxBlogs = blogCount.find(value => value.blogs === count)

}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}