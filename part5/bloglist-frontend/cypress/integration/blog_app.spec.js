const user = {
    name: 'あや こじ',
    username: 'akoji',
    password: 'たまご'
}

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function () {
        cy.contains('Log in').click()
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
})