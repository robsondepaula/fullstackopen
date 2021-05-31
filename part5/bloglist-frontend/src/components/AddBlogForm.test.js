import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> send right input to parent handler', () => {
    const handleAddBlog = jest.fn()
    const handleTitleChange = jest.fn()
    const handleAuthorChange = jest.fn()
    const handleUrlChange = jest.fn()

    const component = render(
        <AddBlogForm
            handleAddBlog={handleAddBlog}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            blogTitle=''
            blogAuthor=''
            blogUrl='' />
    )


    const form = component.container.querySelector('form')
    const authorInput = component.container.querySelector('#author')
    fireEvent.change(authorInput, {
        target: { value: 'Joel Spolsky' }
    })
    const titleInput = component.container.querySelector('#title')
    fireEvent.change(titleInput, {
        target: { value: 'The Joel Test: 12 Steps to Better Code' }
    })
    const urlInput = component.container.querySelector('#url')
    fireEvent.change(urlInput, {
        target: { value: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/' }
    })
    fireEvent.submit(form)

    expect(handleAuthorChange.mock.calls).toHaveLength(1)
    expect(handleTitleChange.mock.calls).toHaveLength(1)
    expect(handleUrlChange.mock.calls).toHaveLength(1)
    expect(handleAddBlog.mock.calls).toHaveLength(1)

})