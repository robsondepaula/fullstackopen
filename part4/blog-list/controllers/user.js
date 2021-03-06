const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const password = body.password
    if (password === undefined || password.length < 3) {
        response.status(400).json({
            error: 'password does not meet length criteria'
        })
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        try {
            const savedUser = await user.save()

            response.json(savedUser)
        } catch (e) {
            response.status(400).json(e.message)
        }
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter