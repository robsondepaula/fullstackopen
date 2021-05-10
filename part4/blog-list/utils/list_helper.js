const _ = require("lodash")

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

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const tally = _.reduce(blogs, (total, next) => {

        total[next.author] = (total[next.author] || 0) + 1;

        return total;
    }, {});

    let max = 0
    let most = {}
    _.forIn(tally, (value, key) => {
        if (value > max) {
            most = {
                author: key,
                blogs: value
            }
            max = value
        }
    })

    return most;
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const tally = _.reduce(blogs, (total, next) => {

        total[next.author] = (total[next.author] || 0) + next.likes;

        return total;
    }, {});

    let max = 0
    let most = {}
    _.forIn(tally, (value, key) => {
        if (value > max) {
            most = {
                author: key,
                likes: value
            }
            max = value
        }
    })

    return most;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}