const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1
    })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        response.status(400).end()
    } else {
        if (!blog.likes) {
            blog.likes = 0
        }

        const user = request.user
        if (user) {
            blog.user = user._id

            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            savedBlog.user = user

            response.status(201)
                .json(savedBlog.toJSON())
        } else {
            return response.status(401).json({
                error: 'unhautorized user'
            })
        }
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    const user = request.user
    if (user) {
        const userid = user._id

        const blog = await Blog.findById(request.params.id)
        if (blog.user.toString() === userid.toString()) {
            await Blog.deleteOne(blog)
            return response.status(204).end()
        }
    }
    return response.status(401).json({
        error: 'unhautorized user'
    })

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true
    }).populate('user', {
        username: 1,
        name: 1
    })
    response.json(updatedBlog)
})

module.exports = blogsRouter