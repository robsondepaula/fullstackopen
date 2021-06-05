const userAya = {
    name: 'あや こじ',
    username: 'akoji',
    password: 'たまご'
}

const userMaki = {
    name: 'まき こじ',
    username: 'mkoji',
    password: 'さかな'
}

const blog = {
    likes: 0,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
}

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', userAya)
        cy.request('POST', 'http://localhost:3003/api/users/', userMaki)
        cy.visit('http://localhost:3000')
    })

    describe('Login', function () {
        xit('succeeds with correct credentials', function () {
            cy.contains('Log in').click()
            cy.get('#username').type(userAya.username)
            cy.get('#password').type(userAya.password)
            cy.get('#login-button').click()

            cy.contains(`${userAya.name} logged in`)
        })

        xit('fails with wrong credentials', function () {
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
            cy.login({ username: userAya.username, password: userAya.password })
        })

        xit('A blog can be created', function () {
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

            xit('it can be liked', function () {
                cy.contains(blog.title).parent().find('button').as('showButton')
                cy.get('@showButton').click()

                cy.contains(`likes ${blog.likes}`).parent().find('button').as('likeButton')
                cy.get('@likeButton').click()

                cy.contains(`likes ${blog.likes + 1}`)
            })

            xit('it can be deleted', function () {
                cy.contains(blog.title).parent().find('button').as('showButton')
                cy.get('@showButton').click()

                cy.contains(`${userAya.name}`).parent().find('button').as('deleteButton')
                cy.get('@deleteButton').click()
            })
        })
    })

    describe('Multiple users', function () {
        it('Aya creates, Maki cannot delete', function () {
            cy.login({ username: userAya.username, password: userAya.password })
            cy.createBlog({
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes
            })


            cy.contains(`${userAya.name} logged in`).parent().find('button').as('logoutButton')
            cy.get('@logoutButton').click()

            cy.login({ username: userMaki.username, password: userMaki.password })

            cy.contains(blog.title).parent().find('button').as('showButton')
            cy.get('@showButton').click()

            cy.contains(`${userAya.name}`).contains('remove').should('not.exist')

        })
    })
})