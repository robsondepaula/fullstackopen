const user = {
    name: 'あや こじ',
    username: 'akoji',
    password: 'たまご'
}

const blog = {
    _id: '5a43fde2cbd20b12a2c34e91',
    user: {
        _id: '5a43e6b6c37f3d065eaaa581',
        username: 'mluukkai',
        name: 'Matti Luukkainen'
    },
    likes: 0,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
}

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('Log in').click()
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()

            cy.contains(`${user.name} logged in`)
        })

        it('fails with wrong credentials', function () {
            cy.contains('Log in').click()
            cy.get('#username').type('akoji')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: user.username, password: user.password })
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.get('#create-blog-button').click()
            cy.contains(blog.title)
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
              cy.createBlog({
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes
              })
            })

            it('it can be liked', function () {
                cy.contains(blog.title).parent().find('button').as('showButton')
                cy.get('@showButton').click()

                cy.contains(`likes ${blog.likes}`).parent().find('button').as('likeButton')
                cy.get('@likeButton').click()

                cy.contains(`likes ${blog.likes + 1}`)
            })
          })
    })
})