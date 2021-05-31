import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('render check', () => {
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

    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'The Joel Test: 12 Steps to Better Code'
    )
    expect(component.container).toHaveTextContent(
        'Joel Spolsky'
    )
    const url = component.getByText('https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/')
    expect(url).not.toBeVisible()

    const likes = component.container.querySelector('.likes')
    expect(likes).not.toBeVisible()
})