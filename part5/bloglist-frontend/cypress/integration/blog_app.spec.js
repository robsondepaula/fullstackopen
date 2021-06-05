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

const blogs = [{
    likes: 0,
    author: 'Joel Spolsky',
    title: 'The Joel Test: 12 Steps to Better Code',
    url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/'
}, {
    likes: 1,
    author: 'Michael Chan',
    title: 'React pattern',
    url: 'https://reactpatterns.com/'
}, {
    likes: 2,
    author: 'Robert C. Martin',
    title: 'First class tests',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html'
}]

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', userAya)
        cy.request('POST', 'http://localhost:3003/api/users/', userMaki)
        cy.visit('http://localhost:3000')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('Log in').click()
            cy.get('#username').type(userAya.username)
            cy.get('#password').type(userAya.password)
            cy.get('#login-button').click()

            cy.contains(`${userAya.name} logged in`)
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
            cy.login({ username: userAya.username, password: userAya.password })
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()
            cy.get('#title').type(blogs[0].title)
            cy.get('#author').type(blogs[0].author)
            cy.get('#url').type(blogs[0].url)
            cy.get('#create-blog-button').click()
            cy.contains(blogs[0].title)
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: blogs[0].title,
                    author: blogs[0].author,
                    url: blogs[0].url,
                    likes: blogs[0].likes
                })
            })

            it('it can be liked', function () {
                cy.contains(blogs[0].title).parent().find('button').as('showButton')
                cy.get('@showButton').click()

                cy.contains(`likes ${blogs[0].likes}`).parent().find('button').as('likeButton')
                cy.get('@likeButton').click()

                cy.contains(`likes ${blogs[0].likes + 1}`)
            })

            it('it can be deleted', function () {
                cy.contains(blogs[0].title).parent().find('button').as('showButton')
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
                title: blogs[0].title,
                author: blogs[0].author,
                url: blogs[0].url,
                likes: blogs[0].likes
            })


            cy.contains(`${userAya.name} logged in`).parent().find('button').as('logoutButton')
            cy.get('@logoutButton').click()

            cy.login({ username: userMaki.username, password: userMaki.password })

            cy.contains(blogs[0].title).parent().find('button').as('showButton')
            cy.get('@showButton').click()

            cy.contains(`${userAya.name}`).contains('remove').should('not.exist')

        })
    })

    describe('Ordering', function () {
        beforeEach(function () {
            cy.login({ username: userAya.username, password: userAya.password })
            for (let blog of blogs) {
                cy.createBlog({
                    title: blog.title,
                    author: blog.author,
                    url: blog.url,
                    likes: blog.likes
                })
            }
        })

        it('Check ordering by likes', function () {

            cy.contains(blogs[0].title).parent().find('button').as('showButton')
            cy.get('@showButton').click()

            cy.contains(`likes ${blogs[0].likes}`).parent().find('button').as('likeButton')

            for(let n = 0; n < 3; n++){
                cy.get('@likeButton')
                  .click()
                cy.wait(500)
              }

              cy.get('.blog').then(items => {
                  expect(items[0]).to.contains.text('likes 3')
                  expect(items[1]).to.contains.text('likes 2')
                  expect(items[2]).to.contains.text('likes 1')
              })
        })
    })
})