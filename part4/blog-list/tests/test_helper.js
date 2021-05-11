const Blog = require('../models/blog')

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

module.exports = {
    initialBlogList,
    blogsInDb
}