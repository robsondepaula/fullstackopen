const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogList[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogList[1])
  await blogObject.save()
})

test('blog list is returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog list item contains id property', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})