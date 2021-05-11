const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

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
  await Blog.insertMany(helper.initialBlogList)
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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Amazing title',
    author: 'Unknown Author',
    url: 'https://loremflickr.com/640/360',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogList.length + 1)
  expect(titles).toContain(
    'New Amazing title')
})

describe('input validation', () => {
  test('missing likes assume 0 as default', async () => {
    const newBlog = {
      title: 'New Amazing title',
      author: 'Unknown Author',
      url: 'https://loremflickr.com/640/360'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(response.body).toHaveLength(initialBlogList.length + 1)
    expect(likes).toContain(0)
  })

  test('missing title and url fails', async () => {
    const newBlog = {
      author: 'Unknown Author'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogList.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updateBlog = {
      likes: 10,
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogList.length)

    const likes = blogsAtEnd.map(r => r.likes)
    expect(likes).toContain(updateBlog.likes)
  })
})