const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

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

        let decodedToken;
        try {
            const token = getTokenFrom(request)
            decodedToken = jwt.verify(token, process.env.SECRET)
            if (!token || !decodedToken.id) {
                return response.status(401).json({
                    error: 'token missing or invalid'
                })
            }
        } catch (err) {
            return response.status(401).json({
                error: 'token invalid'
            })
        }
        const user = await User.findById(decodedToken.id)
        blog.user = user._id

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog.toJSON())
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
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
    })
    response.json(updatedBlog)
})

module.exports = blogsRouter