const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if(_isArrayEmpty(blogs)) {
        throw Error("blogs was undefined or empty")
    }
    let totalLikes = 0
    blogs.forEach(blog => {
        totalLikes += blog.likes
    });
    return totalLikes
}

const _isArrayEmpty = (array) => {
    return array == undefined || (array != undefined && array.length === 0)
} 
  module.exports = {
    dummy, totalLikes
  }