const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogList = [{
        title: 'Amazing title',
        author: 'Unknown Author',
        url: 'https://loremflickr.com/640/360',
        likes: 1
    },
    {
        title: 'Another amazing title',
        author: 'Unknown Author',
        url: 'https://loremflickr.com/640/360',
        likes: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogList,
    blogsInDb,
    usersInDb,
}