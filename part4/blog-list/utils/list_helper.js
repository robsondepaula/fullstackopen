const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const reducer = (max, item) => {
        return item.likes > max ? item.likes : max
    }
    const maxLikes = blogs.reduce(reducer, 0)

    return blogs.find((item) => (item.likes === maxLikes))
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}